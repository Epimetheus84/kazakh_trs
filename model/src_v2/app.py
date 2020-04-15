import os
import threading

from flask import Flask, abort, jsonify
from orm.mongo.image import Image
from model.src_v2.RecognitionModel import RecognitionModel

app = Flask(__name__)

THREADS_MAX_COUNT = 10


def thread_function(image):
    input_file = image.file_path
    coordinates = image.coordinates
    text = ''

    for shape in coordinates:
        shape_text = RecognitionModel.recognize(input_file, shape)
        text += shape_text + ' '

    image.text = text
    image.status = Image.IMAGE_STATUS_TEXT_RECOGNIZED
    image.save()
    return True


@app.route('/')
def main():
    return 'Service available'


@app.route('/mark/<file_path>')
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
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('FLASK_RUN_PORT', 4444)))
