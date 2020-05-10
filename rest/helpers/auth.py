from orm.mongo.user import User
from flask_httpauth import HTTPTokenAuth

auth = HTTPTokenAuth(scheme='Token')


class AuthHelper:
    @staticmethod
    def login(login, password):
        user = User.objects(login=login)
        if not user:
            return False

        user = user.get()
        if not user.check_password(password):
            return False

        return user

    @staticmethod
    def verify_auth_token(token):
        if User.objects(token=token).__len__() == 0:
            return False

        user = User.objects(token=token).get()
        return user






