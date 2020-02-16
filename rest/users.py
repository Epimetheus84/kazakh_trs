from flask import Blueprint, request, abort, jsonify, g
from flask_httpauth import HTTPTokenAuth
auth = HTTPTokenAuth(scheme='Token')

from orm.mongo.user import User

users = Blueprint('users', __name__)


@users.route('/list/',  methods=['GET'])
@auth.login_required
def list_users():
    if not g.current_user.has_access_to_users_list():
        abort(403)

    page = request.args.get('page') or 1
    items_per_page = 10

    offset = (page - 1) * items_per_page

    list_users = User.objects.skip(offset).limit(items_per_page).get()

    return list_users.to_json()


@users.route('/show/<id>',  methods=['GET'])
@auth.login_required
def show_user(id):
    if not g.current_user.has_access_to_see_user():
        abort(403)

    user = User.objects.get({'_id': id})

    if not user:
        abort(404)

    return user.to_json()


@users.route('/update/<id>',  methods=['PUT'])
@auth.login_required
def update_user(id):
    if not g.current_user.has_access_to_update_user():
        abort(403)

    user = User.objects.get({'_id': id})
    data = request.form

    if not user:
        abort(404)

    user.insert_data(data)
    user.save()

    return user.to_json()


@users.route('/create/',  methods=['POST'])
@auth.login_required
def create_user():
    if not g.current_user.has_access_to_create_user():
        abort(403)

    data = request.form

    user = User()
    user.insert_data(data)
    user.save()

    return user.to_json()


@users.route('/delete/<id>',  methods=['DELETE'])
@auth.login_required
def delete_user(id):
    if not g.current_user.has_access_to_delete_user():
        abort(403)

    user = User.objects.get({'_id': id})

    if not user:
        abort(404)

    return jsonify(success=True)
