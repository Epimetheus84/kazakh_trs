import os
import cv2
import threading

from orm.mongo.image import Image
from flask import Flask, request, abort, jsonify

app = Flask(__name__)

THREADS_MAX_COUNT = 10


def text_detect(img, ele_size=(8, 2)):  #
    if len(img.shape) == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img_sobel = cv2.Sobel(img, cv2.CV_8U, 1, 0)  # same as default,None,3,1,0,cv2.BORDER_DEFAULT)
    img_threshold = cv2.threshold(img_sobel, 0, 255, cv2.THRESH_OTSU + cv2.THRESH_BINARY)
    element = cv2.getStructuringElement(cv2.MORPH_RECT, ele_size)
    img_threshold = cv2.morphologyEx(img_threshold[1], cv2.MORPH_CLOSE, element)
    res = cv2.findContours(img_threshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    if cv2.__version__.split(".")[0] == '3':
        _, contours, hierarchy = res
    else:
        contours, hierarchy = res
    Rect = [cv2.boundingRect(i) for i in contours if i.shape[0] > 100]
    RectP = [(int(i[0] - i[2] * 0.08), int(i[1] - i[3] * 0.08), int(i[0] + i[2] * 1.1), int(i[1] + i[3] * 1.1)) for i in
             Rect]
    print(RectP)
    return RectP


def thread_function(image):
    input_file = image.file_path
    img = cv2.imread(input_file)
    rect = text_detect(img)
    image.coordinates = rect
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
    app.run(host=os.getenv('IP', '127.0.0.1'), port=int(os.getenv('PORT', 4441)))
