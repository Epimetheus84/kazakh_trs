import datetime

import mongoengine
from flask import Blueprint, request, abort, jsonify, g
from rest.helpers.auth import auth

from orm.mongo.user import User

users = Blueprint('users', __name__)


@users.route('/list/', methods=['GET'])
@auth.login_required
def list_users():
    page = request.args.get('page') or 1
    items_per_page = 10

    offset = (page - 1) * items_per_page

    list_users = g.current_user.get_list_of_users(offset, items_per_page)
    result_list = []
    for user in list_users:
        user_data = user.prepare_to_response()
        result_list.append(user_data)

    return jsonify(result_list)


@users.route('/show/<login>', methods=['GET'])
@auth.login_required
def show_user(login):
    if not g.current_user.has_access_to_see_user():
        abort(403)

    user = User.objects(login=login)

    if not user.__len__():
        abort(404)

    user = user.get()

    return user.to_json()


@users.route('/update/<login>', methods=['PUT'])
@auth.login_required
def update_user(login):
    if not g.current_user.has_access_to_update_user():
        abort(403)

    user = User.objects(login=login)
    data = request.json

    if not user.__len__():
        abort(404)

    user = user.get()

    user.insert_data(data)
    user.save()

    return user.to_json()


@users.route('/create/', methods=['POST'])
@auth.login_required
def create_user():
    if not g.current_user.has_access_to_create_user():
        abort(403)

    data = request.json

    user = User()
    user.insert_data(data)
    user.generate_token()
    try:
        user.save()
    except mongoengine.errors.NotUniqueError as exc:
        for field in user._fields_ordered:
            if field in str(exc):
                if field == 'id': continue
                return jsonify({'error': 'запись с таким \"{}\" уже существует'.format(field)}), 400
    except mongoengine.errors.ValidationError as exc:
        for field in user._fields_ordered:
            if field in str(exc):
                if field == 'id': continue
                return jsonify({'error': 'поле \"{}\" не может быть пустым  '.format(field)}), 400

    return user.to_json()   


@users.route('/delete/<login>', methods=['DELETE'])
@auth.login_required
def delete_user(login):
    if not g.current_user.has_access_to_delete_user():
        abort(403)

    user = User.objects(login=login)

    if not user.__len__():
        abort(404)

    user.delete()
    return jsonify({'success': True})
