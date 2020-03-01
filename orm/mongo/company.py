import datetime
import json

from mongoengine import *
from orm.mongo.connection import Connection

Connection.connect()


class Company(Document):
    name = StringField(max_length=64, required=True)
    info = StringField(max_length=65536)
    active = BooleanField(default=True)
    date_created = DateTimeField(default=datetime.datetime.utcnow)
    date_modified = DateTimeField(default=datetime.datetime.utcnow)

    def insert_data(self, data):
        if 'name' in data:
            self.name = data['name']

        if 'info' in data:
            self.info = data['info']

        if 'active' in data:
            self.active = data['active']

        self.date_modified = datetime.datetime.utcnow()

    def prepare_to_response(self):
        return {
            'name': self.name,
            'info': self.info,
            'date_created': int(self.date_created.timestamp()),
            'date_modified': int(self.date_modified.timestamp()),
        }

    def to_json(self):
        return json.dumps(self.prepare_to_response())

