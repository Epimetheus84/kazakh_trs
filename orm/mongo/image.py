import string
from random import random

from mongoengine import *
from orm.mongo.connection import Connection

import datetime

IMAGE_STATUS_NEW = 0
IMAGE_STATUS_TEXT_DETECTED = 1
IMAGE_STATUS_DIVIDED = 2
IMAGE_STATUS_TEXT_RECOGNIZED = 3

FILE_PATH_LENGTH = 16

Connection.connect()


class Image(Document):
    file_path = StringField(max_length=FILE_PATH_LENGTH, required=True)
    filename = StringField(max_length=64)
    date_created = DateTimeField(default=datetime.datetime.utcnow)
    date_modified = DateTimeField(default=datetime.datetime.utcnow)
    status = IntField(max_value=10, required=True, default=IMAGE_STATUS_NEW)
    coordinates = StringField()
    text = StringField()

    def update_data(self, data):
        if 'filename' in data:
            self.filename = data.filename

        if 'status' in data:
            self.status = data.status

        if 'coordinates' in data:
            self.coordinates = data.coordinates

        self.date_modified = datetime.datetime.utcnow

        if self.filename == '':
            self.filename = self.file_path

    def create_data(self, data):
        self.update_data(data)

    def can_be_marked(self):
        return True

    def generate_file_path(self):
        self.file_path = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(FILE_PATH_LENGTH))
