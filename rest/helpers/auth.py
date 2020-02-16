from orm.mongo.user import User


class AuthHelper:
    @staticmethod
    def login(login, password):
        user = User.objects.findOne(login=login)
        if not user.check_password(password):
            return False
        return user

    @staticmethod
    def verify_auth_token(token):
        user = User.objects.get(token=token)
        return user
