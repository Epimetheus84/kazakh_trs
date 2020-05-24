import requests

ADDRESS = 'http://127.0.0.1:4445'


class TextMarker:
    @staticmethod
    def mark(file_path):
        url = ADDRESS + '/mark/' + file_path
        response = requests.get(url=url)
        return response.json()
