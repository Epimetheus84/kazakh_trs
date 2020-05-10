import os
import json
import threading

from tensorflow import keras
from flask import Flask, abort, jsonify
from orm.mongo.image import Image
from model.src_v2.RecognitionModel import RecognitionModel

app = Flask(__name__)

THREADS_MAX_COUNT = 10


def thread_function(image):
    input_file = image.get_full_file_path()
    if not os.path.isfile(input_file):
        raise Exception('File does not exists')

    coordinates = json.loads(image.coordinates)
    text = []

    for shape in coordinates:
        word = RecognitionModel.recognize(input_file, shape)
        if not word:
            continue

        text.append({
            'coordinates': shape,
            'word': word
        })

    image.text = json.loads(text)
    image.status = Image.IMAGE_STATUS_TEXT_RECOGNIZED
    image.save()
    return True


@app.route('/')
def main():
    return 'Service available'


@app.route('/recognize/<file_path>')
def recognize(file_path):
    image = Image.objects(file_path=file_path)

    if not image:
        abort(404)

    image = image.get()
    if threading.active_count() >= THREADS_MAX_COUNT:
        raise Exception('Threads limit reached')

    x = threading.Thread(target=thread_function, args=(image,))
    x.start()

    return jsonify({'started': True})


if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('FLASK_RUN_PORT', 4446)))
