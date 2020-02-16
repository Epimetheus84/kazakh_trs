from passlib.context import CryptContext

pwd_context = CryptContext(
        schemes=["pbkdf2_sha256"],
        default="pbkdf2_sha256",
        pbkdf2_sha256__default_rounds=30000
)


class Password:
    @staticmethod
    def encrypt_password(password):
        return pwd_context.encrypt(password)

    @staticmethod
    def check_encrypted_password(password, hashed):
        return pwd_context.verify(password, hashed)
