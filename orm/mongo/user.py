import datetime
import random
import string
import json

from mongoengine import *

import orm.mongo.company as com
import orm.mongo.image as img
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
    password = StringField(max_length=256, required=True)
    first_name = StringField(max_length=64, required=True)
    last_name = StringField(max_length=64, required=True)
    company = StringField(max_length=256, required=True)
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
        self.password = str(Password.encrypt_password(password))
        print(str(Password.encrypt_password(password)))

    def check_password(self, password):
        return Password.check_encrypted_password(self.password, password)

    def update_data(self, data):
        if 'login' in data:
            self.login = data['login']

        if 'email' in data:
            self.email = data['email']

        if 'password' in data:
            self.generate_password(data['password'])

        if 'first_name' in data:
            self.first_name = data['first_name']

        if 'last_name' in data:
            self.last_name = data['last_name']

        if 'middle_name' in data:
            self.middle_name = data['middle_name']

        if 'active' in data:
            self.active = data['active']

        if 'role' in data:
            self.role = data['role']

        if 'company' in data \
                and data['company'] \
                and com.Company.objects(id=data['company']):
            self.company = data['company']

        self.date_modified = datetime.datetime.utcnow()

    def insert_data(self, data):
        self.update_data(data)

    def has_access_to_see_user(self):
        return True

    def has_access_to_recognize_image(self):
        return True

    def has_access_to_update_user(self):
        return self.role == ROLE_ADMIN or self.role == ROLE_DEVELOPER

    def has_access_to_create_user(self):
        return self.role == ROLE_ADMIN or self.role == ROLE_DEVELOPER

    def has_access_to_delete_user(self):
        return self.role == ROLE_ADMIN or self.role == ROLE_DEVELOPER

    def has_access_to_see_image(self):
        return True

    def has_access_to_mark_image(self):
        return True

    def has_access_to_update_image(self, uploaded_by):
        if self.login == uploaded_by:
            return True

        return self.role == ROLE_ADMIN or self.role == ROLE_DEVELOPER

    def has_access_to_create_image(self):
        return True

    def has_access_to_delete_image(self):
        return self.role == ROLE_ADMIN or self.role == ROLE_DEVELOPER

    def prepare_to_response(self):
        return {
            'login': self.login,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'middle_name': self.middle_name,
            'date_created': int(self.date_created.timestamp()),
            'date_modified': int(self.date_modified.timestamp()),
            'company': com.Company.objects(id=self.company).get().prepare_to_response() if com.Company.objects(
                id=self.company) else '',
            'role': self.role,
        }

    def to_json(self):
        return json.dumps(self.prepare_to_response())

    def has_access_to_see_company(self, company_id):
        return self.company == str(company_id)

    def has_access_to_update_company(self, company_id):
        if self.role == ROLE_DEVELOPER:
            return True

        if self.role != ROLE_ADMIN:
            return False

        return self.company == str(company_id)

    def has_access_to_create_company(self):
        return self.role == ROLE_DEVELOPER

    def has_access_to_delete_company(self, company_id):
        if self.role == ROLE_DEVELOPER:
            return True

        if self.role != ROLE_ADMIN:
            return False

        return self.company == str(company_id)

    def get_list_of_users(self, offset, items_per_page):
        if self.role == ROLE_DEVELOPER:
            return User.objects.skip(offset).limit(items_per_page)

        return User.objects(company=self.company).skip(offset).limit(items_per_page)

    def get_list_of_companies(self, offset, items_per_page):
        if self.role == ROLE_DEVELOPER:
            return com.Company.objects.skip(offset).limit(items_per_page)

        return com.Company.objects(id=self.company)

    def get_list_of_images(self, offset, items_per_page):
        if self.role == ROLE_DEVELOPER:
            return img.Image.objects.skip(offset).limit(items_per_page)

        if self.role == ROLE_ADMIN:
            users_logins = []
            employees = User.objects(company=self.company)
            for employee in employees:
                users_logins.append(employee.login)

            return img.Image.objects(uploaded_by__in=users_logins)

        return img.Image.objects(uploaded_by=self.login)

    def delete_with_relations(self):
        images = img.Image.objects(uploaded_by=self.login)
        for image in images:
            image.delete_with_relations()

        self.delete()
