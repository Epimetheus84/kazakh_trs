import csv
import os
import random
import codecs
import textwrap

import numpy as np
import cv2
from PIL import ImageFont, ImageDraw, Image
from imutils import contours

DATASET_SIZE = 6000


class DataProvider:
    def __init__(self, lettersList, datasetSize):
        self.lettersList = lettersList
        self.datasetSize = datasetSize
        self.idx = 0

    def getText(self):
        return self.lettersList[random.randrange(0, len(self.lettersList))]

    def hasNext(self):
        return self.idx <= self.datasetSize

    def getNext(self):
        h = 112
        w = 112
        img = np.zeros((h, w, 3), np.uint8)
        img.fill(random.uniform(200, 255))
        b, g, r, a = random.randrange(0, 100, 1), 0, 0, 0
        text = self.getText()
        self.idx += 1

        font_size = random.randrange(100, 112, 1)
        font = ImageFont.truetype("TTWPGOTT.ttf", font_size, encoding="UTF-8")
        img_pil = Image.fromarray(img)
        draw = ImageDraw.Draw(img_pil)
        width, height = font.getsize(text)
        draw.text(((w / 2) - (width / 2), 1), text, font=font, fill=(b, g, r, a))

        img_pil = img_pil.rotate(random.uniform(-1.5, 1.5), expand=0, fillcolor=(255, 255, 255))
        img = np.array(img_pil)
        img = salt(img)
        img = cv2.GaussianBlur(img, (5, 5), random.randrange(0, 2, 1))

        return (text, img)


def read_img_and_resize(img, shape):
    if shape[1] is None:
        height, width, channels = img.shape
        scale_factor = shape[0] / height
        img_width = scale_factor * width
    else:
        img_width = shape[1]
    img = cv2.resize(img, (shape[0], img_width))
    return img


def salt(image):
    row, col, ch = image.shape
    s_vs_p = 0.5
    amount = random.uniform(0.01, 0.001)
    out = np.copy(image)
    num_salt = np.ceil(amount * image.size * s_vs_p)
    coords = [np.random.randint(0, i - 1, int(num_salt))
              for i in image.shape]
    out[coords] = 1

    num_pepper = np.ceil(amount * image.size * (1. - s_vs_p))
    coords = [np.random.randint(0, i - 1, int(num_pepper))
              for i in image.shape]
    out[coords] = 0
    return out


def create_dataset(data_provider, subdir, csv_letters_file):
    if not os.path.exists('../data/development/kazakh_bw'):
        os.makedirs('../data/development/kazakh_bw')

    if not os.path.exists('../data/development/kazakh_bw/letters'):
        os.makedirs('../data/development/kazakh_bw/letters')

    if not os.path.exists('../data/development/kazakh_bw/letters/examples'):
        os.makedirs('../data/development/kazakh_bw/letters/examples')

    if not os.path.exists('../data/development/kazakh_bw/letters/examples/%s' % subdir):
        os.makedirs('../data/development/kazakh_bw/letters/examples/%s' % subdir)

    ctr = 0
    while data_provider.hasNext():
        sample = data_provider.getNext()

        # cv2.imwrite('../data/development/kazakh_bw/letters/examples/%s/%d.png' % (subdir, ctr), sample[1])
        # file.write(sample[0] + "," + str(letters.index(sample[0])) + ",\n")

        letter = sample[0]
        letter_index = letters.index(letter)

        if not os.path.exists(u'../data/development/kazakh_bw/letters/examples/{0}'.format(letter_index)):
            os.makedirs(u'../data/development/kazakh_bw/letters/examples/{0}'.format(letter_index))

        filepath = u'../data/development/kazakh_bw/letters/examples/{0}/{1}.png'.format(letter_index, ctr)

        image = sample[1]
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU + cv2.THRESH_BINARY)[1]

        cnts = cv2.findContours(thresh, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)
        cnts = cnts[0] if len(cnts) == 2 else cnts[1]
        cnts, _ = contours.sort_contours(cnts, method="left-to-right")
        try:
            c = cnts[1]
            x, y, w, h = cv2.boundingRect(c)
            ROI = image[y:y + h, x:x + w]
            ROI = read_img_and_resize(ROI, (112, 112, 3))

            # cv2.imwrite(filepath, sample[1])
            cv2.imwrite(filepath, ROI)
            csv_letters_file.write(letter + ",\n")

            ctr += 1
        except IndexError:
            continue


if __name__ == '__main__':
    letters = []
    with open("letters.csv", encoding='utf8') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            letters.append(row[0])

    validation_ratio = 0.2

    csv_letters_file = codecs.open("../data/development/kazakh/letters/samples.csv", "w+", "utf-8")
    csv_letters_file.truncate(0)
    csv_letters_file.write("letter,category,\n")

    data_provider = DataProvider(letters, DATASET_SIZE * (1 - validation_ratio))
    create_dataset(data_provider, 'training', csv_letters_file)

    data_provider = DataProvider(letters, DATASET_SIZE * validation_ratio)
    create_dataset(data_provider, 'validation', csv_letters_file)

    csv_letters_file.close()
