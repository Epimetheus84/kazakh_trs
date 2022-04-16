import datetime
import json

from mongoengine import *
from orm.mongo.connection import Connection

import orm.mongo.user as usr

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

    def update_data(self, data):
        self.insert_data(data)

    def prepare_to_response(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'info': self.info,
            'date_created': int(self.date_created.timestamp()),
            'date_modified': int(self.date_modified.timestamp()),
        }

    def to_json(self):
        return self.prepare_to_response()

    def delete_with_relations(self):
        employees = usr.User.objects(company=str(self.id))
        for employee in employees:
            employee.delete_with_relations()

        self.delete()
