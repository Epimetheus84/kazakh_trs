import requests

ADDRESS = ''


class TextMarker:
    @staticmethod
    def mark(file_path):
        url = ADDRESS + '/mark'
        data = {
            'file_path': file_path
        }
        response = requests.post(url=url, data=data)
        return response.json()
