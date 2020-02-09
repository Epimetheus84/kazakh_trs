from mongoengine import connect

class Connection:
    @staticmethod
    def connect():
        connect('kazakh-ocr')
