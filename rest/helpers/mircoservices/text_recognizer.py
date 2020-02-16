import requests

ADDRESS = ''


class TextRecognizer:
    @staticmethod
    def mark(file_path):
        url = ADDRESS + '/recognize'
        data = {
            'file_path': file_path
        }
        response = requests.post(url=url, data=data)
        return response.json()
