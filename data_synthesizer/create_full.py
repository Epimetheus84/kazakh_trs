import csv
import os
import random
import textwrap

import numpy as np
import cv2
from PIL import ImageFont, ImageDraw, Image


class DataProvider:
    def __init__(self, wordList):
        self.wordList = wordList
        self.idx = 0

    def getText(self):
        text = ''
        for i in range(0, random.randrange(80, 300, 1)):
            com_dot_up_prob = random.randrange(0, 10)
            if com_dot_up_prob == 3:
                text += self.wordList[random.randrange(0, len(self.wordList))].upper()
            else:
                text += self.wordList[random.randrange(0, len(self.wordList))]

            if com_dot_up_prob == 0:
                text += '.'
            if com_dot_up_prob == 1 or com_dot_up_prob == 2:
                text += ','

            text += ' '
        return text

    def hasNext(self):
        return self.idx <= 10

    def getNext(self):
        h = int(3507 / 2)
        w = int(2528 / 2)
        img = np.zeros((h, w, 3), np.uint8)
        img.fill(255)
        b, g, r, a = random.randrange(0, 100, 1), 0, 0, 0
        text = self.getText()
        self.idx += 1

        font_size = random.randrange(32, 40, 1)
        font = ImageFont.truetype("TTWPGOTT.ttf", font_size, encoding="UTF-8")
        width, height = font.getsize(text)
        img_pil = Image.fromarray(img)
        draw = ImageDraw.Draw(img_pil)
        print(w / font_size)
        lines = textwrap.wrap(text, width=(w / (font_size * 0.5)))
        y_text = 20

        for line in lines:
            print(line)

            print(width, height, font_size)
            draw.text((20, y_text), line, font=font, fill=(b, g, r, a))
            y_text += height

        img_pil = img_pil.rotate(random.uniform(-1.5, 1.5), expand=0, fillcolor=(255, 255, 255))
        img = np.array(img_pil)
        img = salt(img)
        img = cv2.GaussianBlur(img, (5, 5), random.randrange(0, 2, 1))

        return (text, img)


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


def create_dataset(data_provider):
    if not os.path.exists('../data/development/kazakh'):
        os.makedirs('../data/development/kazakh')

    if not os.path.exists('../data/development/kazakh/examples'):
        os.makedirs('../data/development/kazakh/examples')

    ctr = 0
    while data_provider.hasNext():
        sample = data_provider.getNext()

        cv2.imwrite('../data/development/kazakh/examples/%d.png' % ctr, sample[1])

        line = '%d' % ctr + ' ' + sample[0] + '\n'

        ctr += 1


if __name__ == '__main__':
    words = []
    with open("words.csv", encoding='utf8') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            words.append(row[0])

    data_provider = DataProvider(words)
    create_dataset(data_provider)
