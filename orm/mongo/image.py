from mongoengine import *
from orm.mongo.connection import Connection

import datetime

IMAGE_STATUS_NEW = 0
IMAGE_STATUS_TEXT_DETECTED = 1
IMAGE_STATUS_DIVIDED = 2
IMAGE_STATUS_TEXT_RECOGNIZED = 3

Connection.connect()


class Image(Document):
    filename = StringField(max_length=64, required=True)
    datecreated = DateTimeField(default=datetime.datetime.utcnow)
    datemodified = DateTimeField(default=datetime.datetime.utcnow)
    status = IntField(max_value=10, required=True, default=IMAGE_STATUS_NEW)
    coordinates = StringField()
    text = StringField()