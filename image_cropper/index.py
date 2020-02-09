import cv2
from threading import Thread
from flask import Flask
from orm.mongo.image import Image

app = Flask(__name__)


def divide_image(image):
    img = cv2.imread(image.filename)
    for rect_coordinates in image.coordinates:
        # coordinates = (17, 279, 90, 292)
        crop_img = img[rect_coordinates[1]:rect_coordinates[3], rect_coordinates[0]:rect_coordinates[2]]
        cv2.imshow("cropped", crop_img)


def rescan():
    images = Image.objects()
    if images.__len__ == 0:
        return

    for image in images:
        thread = Thread(target=divide_image, args=(10, ))
        thread.start()
        thread.join()


@app.route('/rescan')
def accept_rescan_request():
    thread = Thread(target=rescan, args=())
    thread.start()
    thread.join()

    return 'OK'