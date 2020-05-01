import base64
import os
import glob
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
UPLOAD_FOLDER = os.path.join('.', 'data', 'production', 'images')


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
        if 'coordinates' in data:
            self.coordinates = data['coordinates']

        if 'text' in data:
            self.text = data['text']

        print(data)
        self.date_modified = datetime.datetime.utcnow()

    def insert_data(self, data):
        if 'original_filename' in data:
            self.original_filename = data['original_filename']

        if 'uploaded_by' in data:
            self.uploaded_by = data['uploaded_by']

        if self.original_filename == '':
            self.original_filename = self.file_path

        self.update_data(data)

    def can_be_marked(self):
        return True

    def generate_file_path(self):
        self.file_path = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(FILE_PATH_LENGTH))

    def prepare_to_response(self):
        return {
            'original_filename': self.original_filename,
            'status': self.status,
            'coordinates': self.coordinates,
            'uploaded_by': User.objects(login=self.uploaded_by).get().login if User.objects(login=self.uploaded_by) else {},
            'date_created': int(self.date_created.timestamp()),
            'date_modified': int(self.date_modified.timestamp()),
            'file_path': self.file_path,
            'file_url': '/images/uploads/' + self.uploaded_by + '/' + self.file_path + '/original.' + self.file_extension,
            'text': self.text
        }

    def to_json(self):
        print(self.prepare_to_response())
        return json.dumps(self.prepare_to_response())

    def get_uploaded_file_ext(self):
        return '.' in self.original_filename and self.original_filename.rsplit('.', 1)[1].lower()

    def get_full_folder_path(self):
        return os.path.join(UPLOAD_FOLDER, self.uploaded_by, self.file_path)

    def get_full_file_path(self):
        return os.path.join(self.get_full_folder_path(), 'original.' + self.file_extension)

    def upload(self, file):
        if not os.path.exists(os.path.join(UPLOAD_FOLDER, self.uploaded_by)):
            try:
                os.makedirs(os.path.join(UPLOAD_FOLDER, self.uploaded_by))
            except FileExistsError:
                print('folder ' + os.path.join(UPLOAD_FOLDER, self.uploaded_by) + ' already exits')

        if not os.path.exists(os.path.join(UPLOAD_FOLDER, self.uploaded_by, self.file_path)):
            try:
                os.makedirs(os.path.join(UPLOAD_FOLDER, self.uploaded_by, self.file_path))
            except FileExistsError:
                print('folder ' + os.path.join(UPLOAD_FOLDER, self.uploaded_by, self.file_path) + ' already exits')

        file_ext = self.get_uploaded_file_ext()
        if file and file_ext in ALLOWED_EXTENSIONS:
            full_file_path = self.get_full_file_path()
            file.save(full_file_path)
            return True

        return False

    def delete_file(self):
        files = glob.glob(os.path.join(self.get_full_folder_path(), '*'), recursive=True)
        for f in files:
            try:
                os.remove(f)
            except OSError as e:
                print("Error: %s : %s" % (f, e.strerror))

        os.rmdir(self.get_full_folder_path())
