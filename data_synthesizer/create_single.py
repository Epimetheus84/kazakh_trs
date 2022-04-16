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
        word_index = random.randint(1, self.wordList.__len__() - 1)
        self.idx += 1
        return self.wordList[word_index].upper(), self.idx - 1

    def hasNext(self):
        return self.idx < 100

    def getNext(self, word):
        h = 128
        font_size = 144
        w = int(len(word) * ((font_size / 2) + 2))
        img = np.zeros((h, w, 3), np.uint8)
        img.fill(255)
        b, g, r, a = random.randrange(0, 100, 1), 0, 0, 0

        font = ImageFont.truetype("./TTWPGOTT.ttf", font_size, encoding="UTF-8")
        img_pil = Image.fromarray(img)
        draw = ImageDraw.Draw(img_pil)

        if word.__len__() > 3:
            draw.text((font_size / 2, 0), word, font=font, fill=(b, g, r, a))
        else:
            draw.text((0, 0), word, font=font, fill=(b, g, r, a))

        img_pil = img_pil.rotate(random.uniform(-2, 2), expand=0, fillcolor=(255, 255, 255))

        img = np.array(img_pil)
        img = salt(img)
        # img = cv2.GaussianBlur(img, (5, 5), random.uniform(0, 1))

        return word, img


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
    if not os.path.exists('../data/development/kazakh_big'):
        os.makedirs('../data/development/kazakh_big')

    if not os.path.exists('../data/development/kazakh_big/word'):
        os.makedirs('../data/development/kazakh_big/word')

    if not os.path.exists('../data/development/kazakh_big/word/examples'):
        os.makedirs('../data/development/kazakh_big/word/examples')

    train_file = open('../data/development/kazakh_big/word/train_ksd_annotation.txt', 'w+', encoding='utf8')
    train_file.truncate(0)

    test_file = open('../data/development/kazakh_big/word/test_ksd_annotation.txt', 'w+', encoding='utf8')
    test_file.truncate(0)

    ctr = 0
    samples_per_word = 60
    while data_provider.hasNext():
        word_n_index = data_provider.getWord()
        for i in range(samples_per_word):
            sample = data_provider.getNext(word_n_index[0])

            cv2.imwrite('../data/development/kazakh_big/word/examples/%d.jpg' % ctr, sample[1])

            ctr += 1

            line = "examples/" + str(ctr) + '.jpg ' + str(word_n_index[0]) + '\n'
            if i < samples_per_word * 0.8:
                train_file.write(line)
            else:
                test_file.write(line)

    train_file.close()
    test_file.close()


if __name__ == '__main__':
    words = []
    with open("./words.csv", encoding='utf8') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            words.append(row[0])

    data_provider = DataProvider(words)
    create_dataset(data_provider)
