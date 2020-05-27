import requests

ADDRESS = 'http://127.0.0.1:4446'


class TextRecognizer:
    @staticmethod
    def recognize(file_path):
        url = ADDRESS + '/recognize/' + file_path
        response = requests.get(url=url)
        return response.json()
