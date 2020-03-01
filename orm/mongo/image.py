import base64
import os
import string
import json
import random

from mongoengine import *
from orm.mongo.connection import Connection

import datetime

from orm.mongo.user import User

Connection.connect()

FILE_PATH_LENGTH = 16

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = '/'

class Image(Document):
    IMAGE_STATUS_NEW = 0
    IMAGE_STATUS_TEXT_DETECTED = 1
    IMAGE_STATUS_DIVIDED = 2
    IMAGE_STATUS_TEXT_RECOGNIZED = 3

    file_path = StringField(max_length=FILE_PATH_LENGTH, required=True)
    original_filename = StringField(max_length=64)
    file_extension = StringField(max_length=4)
    uploaded_by = StringField(max_length=64, required=True)
    date_created = DateTimeField(default=datetime.datetime.utcnow)
    date_modified = DateTimeField(default=datetime.datetime.utcnow)
    status = IntField(max_value=10, required=True, default=IMAGE_STATUS_NEW)
    coordinates = StringField()
    text = StringField()

    def update_data(self, data):
        if 'original_filename' in data:
            self.original_filename = data['original_filename']

        if 'status' in data:
            self.status = data['status']

        if 'coordinates' in data:
            self.coordinates = data['coordinates']

        if 'uploaded_by' in data:
            self.uploaded_by = data['uploaded_by']

        self.date_modified = datetime.datetime.utcnow()

        if self.original_filename == '':
            self.original_filename = self.file_path

    def insert_data(self, data):
        self.update_data(data)

    def can_be_marked(self):
        return True

    def generate_file_path(self):
        self.file_path = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(FILE_PATH_LENGTH))

    def prepare_to_response(self):
        return {
            'original_filename': self.original_filename,
            'status': self.status,
            'coordinates': self.coordinates,
            'uploaded_by': User.objects(login=self.uploaded_by).get() if User.objects(login=self.uploaded_by) else {},
            'date_created': int(self.date_created.timestamp()),
            'date_modified': int(self.date_modified.timestamp()),
            'data': self.get_base64()
        }

    def to_json(self):
        return json.dumps(self.prepare_to_response())

    def get_uploaded_file_ext(self):
        return '.' in self.original_filename and self.original_filename.rsplit('.', 1)[1].lower()

    def get_full_file_path(self):
        return os.path.join(UPLOAD_FOLDER, self.uploaded_by, self.file_path, 'original.' + self.file_extension)

    def upload(self, file):
        file_ext = self.get_uploaded_file_ext()
        if file and file_ext in ALLOWED_EXTENSIONS:
            full_file_path = self.get_full_file_path()
            file.save(full_file_path)
            return True

        return False

    def get_base64(self):
        full_file_path = self.get_full_file_path()
        with open(full_file_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
            return encoded_string
