import datetime
import string

from random import random
from mongoengine import *
from orm.mongo.connection import Connection
from rest.helpers.password import Password

ROLE_COMMON = 0
ROLE_MODERATOR = 1
ROLE_ADMIN = 2
ROLE_DEVELOPER = 10

TOKEN_LENGTH = 128

Connection.connect()


class User(Document):
    login = StringField(max_length=64, required=True, unique=True)
    email = StringField(max_length=64, required=True, unique=True)
    password = StringField(max_length=64, required=True)
    first_name = StringField(max_length=64, required=True)
    last_name = StringField(max_length=64, required=True)
    token = StringField(max_length=TOKEN_LENGTH, required=True)
    middle_name = StringField(max_length=64)
    date_created = DateTimeField(default=datetime.datetime.utcnow)
    date_modified = DateTimeField(default=datetime.datetime.utcnow)
    active = BooleanField(default=True)
    role = IntField(max_value=10, required=True, default=ROLE_COMMON)

    def generate_token(self):
        token = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(TOKEN_LENGTH))
        self.token = token

    def generate_password(self, password):
        self.password = Password.encrypt_password(password)

    def check_password(self, password):
        return Password.check_encrypted_password(self.password, password)

    def insert_data(self, data):
        if 'login' in data:
            self.login = data.login

        if 'email' in data:
            self.email = data.email

        if 'password' in data:
            self.generate_password(data.password)

        if 'first_name' in data:
            self.first_name = data.first_name

        if 'last_name' in data:
            self.last_name = data.last_name

        if 'middle_name' in data:
            self.middle_name = data.middle_name

        if 'active' in data:
            self.active = data.active

        if 'role' in data:
            self.role = data.role

        self.date_modified = datetime.datetime.utcnow

    def has_access_to_users_list(self):
        return True

    def has_access_to_see_user(self):
        return True

    def has_access_to_update_user(self):
        return self.role == ROLE_ADMIN or self.role == ROLE_DEVELOPER

    def has_access_to_create_user(self):
        return self.role == ROLE_ADMIN or self.role == ROLE_DEVELOPER

    def has_access_to_delete_user(self):
        return self.role == ROLE_ADMIN or self.role == ROLE_DEVELOPER

    def has_access_to_images_list(self):
        return True

    def has_access_to_see_image(self):
        return True

    def has_access_to_update_image(self):
        return self.role == ROLE_ADMIN or self.role == ROLE_DEVELOPER

    def has_access_to_create_image(self):
        return self.role == ROLE_ADMIN or self.role == ROLE_DEVELOPER

    def has_access_to_delete_image(self):
        return self.role == ROLE_ADMIN or self.role == ROLE_DEVELOPER
