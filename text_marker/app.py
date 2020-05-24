import json
import os
import threading

from flask import Flask, abort, jsonify

from orm.mongo.image import Image
from text_marker.cv.detector import Detector

app = Flask(__name__)

THREADS_MAX_COUNT = 10


def thread_function(image):
    input_file = image.get_full_file_path()
    rect = Detector.get_rect(input_file)
    coordinates = Image.prepare_coordinates(rect)
    image.coordinates = json.dumps(coordinates)
    image.status = Image.IMAGE_STATUS_TEXT_DETECTED
    image.save()
    return True


@app.route('/')
def hello():
    return 'Service available'


@app.route('/mark/<file_path>')
def mark(file_path):
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
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 4445)))
