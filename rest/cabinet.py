from flask import Blueprint, request, abort, jsonify, g
from rest.helpers.auth import AuthHelper, auth

cabinet = Blueprint('cabinet', __name__)


@cabinet.route('/login/',  methods=['POST'])
def login():
    data = request.json
    if 'password' not in data or 'login' not in data:
        abort(401)

    user = AuthHelper.login(data['login'], data['password'])
    if not user:
        abort(401)

    return jsonify(token=user.token)


@auth.verify_token
def verify_token(token):
    print('token', token)
    g.current_user = AuthHelper.verify_auth_token(token)
    return g.current_user


@cabinet.route('/me/')
@auth.login_required
def me():
    return g.current_user.to_json()
