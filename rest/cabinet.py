from flask import Blueprint, request, abort, jsonify, g
from flask_httpauth import HTTPTokenAuth
from rest.helpers.auth import AuthHelper
auth = HTTPTokenAuth(scheme='Token')


cabinet = Blueprint('cabinet', __name__)


@cabinet.route('/auth/',  methods=['POST'])
def auth():
    data = request.form
    if 'password' not in data or 'login' not in data:
        abort(401)

    user = AuthHelper.login(data.login, data.password)
    if not user:
        abort(401)

    return jsonify(token=user.token)


@auth.verify_token
def verify_token(token):
    g.current_user = AuthHelper.verify_auth_token(token)
    return g.current_user
