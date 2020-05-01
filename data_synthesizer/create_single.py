# -*- coding: utf-8 -*-
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

    def getWord(self):
        com_dot_up_prob = random.randrange(0, 10)

        if com_dot_up_prob > 7:
            return self.wordList[self.idx].upper()
        else:
            return self.wordList[self.idx]

    def hasNext(self):
        return self.idx < self.wordList.__len__()

    def getNext(self):
        word = self.getWord()

        h = 20
        w = len(word) * 8 + 10
        img = np.zeros((h, w, 3), np.uint8)
        img.fill(255)
        b, g, r, a = random.randrange(0, 100, 1), 0, 0, 0
        self.idx += 1

        font_size = 16
        font = ImageFont.truetype("./TTWPGOTT.ttf", font_size, encoding="UTF-8")
        img_pil = Image.fromarray(img)
        draw = ImageDraw.Draw(img_pil)

        draw.text((10, 0), word, font=font, fill=(b, g, r, a))

        img = np.array(img_pil)
        img = salt(img)

        return (word, img)


def salt(image):
    row, col, ch = image.shape
    s_vs_p = 0.5
    amount = random.uniform(0.01, 0.001)
    out = np.copy(image)
    num_salt = np.ceil(amount * image.size * s_vs_p)
    coords = [np.random.randint(0, i - 1, int(num_salt))
              for i in image.shape]
    out[tuple(coords)] = 1

    num_pepper = np.ceil(amount * image.size * (1. - s_vs_p))
    coords = [np.random.randint(0, i - 1, int(num_pepper))
              for i in image.shape]
    out[tuple(coords)] = 0
    return out


def create_dataset(data_provider):
    if not os.path.exists('../data/development/kazakh'):
        os.makedirs('../data/development/kazakh')

    if not os.path.exists('../data/development/kazakh/images'):
        os.makedirs('../data/development/kazakh/images')

    f = open('../data/development/kazakh/words.txt', 'w+',  encoding='utf8')

    ctr = 0
    while data_provider.hasNext():
        sample = data_provider.getNext()

        cv2.imwrite('../data/development/kazakh/images/%d.png' % ctr, sample[1])

        line = '%d' % ctr + ' ' + sample[0] + '\n'
        f.write(line)

        ctr += 1


if __name__ == '__main__':
    words = []
    with open("./words.csv", encoding='utf8') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            words.append(row[0])

    data_provider = DataProvider(words)
    create_dataset(data_provider)
