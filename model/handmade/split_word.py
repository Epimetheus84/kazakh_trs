import cv2
from imutils import contours
import numpy as np

image = cv2.imread(
    'C:\\Users\\epimetheus\\PycharmProjects\\kazakh_trs\\data\\development\\kazakh_big\\word\\examples\\67.jpg')
# gray = cv2.cvtColor(image, cv2.COLOR_RGB2HSV_FULL)
# thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU + cv2.THRESH_BINARY)[1]
#
# cnts = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
# cnts = cnts[0]
# cnts, _ = contours.sort_contours(cnts, method="left-to-right")


def show_image(image):
    cv2.imshow('image', image)
    c = cv2.waitKey()
    if c >= 0: return -1
    return 0


# image = cv2.imread('./Photos/num.png')
img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
ret, im = cv2.threshold(img_gray, 100, 255, cv2.THRESH_BINARY_INV)
cnts, hierarchy = cv2.findContours(im, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
cnts, _ = contours.sort_contours(cnts, method="left-to-right")

ROI_number = 0
for c in cnts:
    area = cv2.contourArea(c)
    if area > 10:
        x, y, w, h = cv2.boundingRect(c)
        # if w < 32 or h < 32:
        #     continue
        ROI = image[y:y + h, x:x + w]
        peace_number = "{:03d}".format(ROI_number)
        cv2.imwrite('peaces/ROI_{}.jpg'.format(peace_number), ROI)
        cv2.rectangle(image, (x, y), (x + w, y + h), (36, 255, 12), 1)
        ROI_number += 1

cv2.imshow('thresh', im)
cv2.imshow('image', image)
cv2.waitKey()
