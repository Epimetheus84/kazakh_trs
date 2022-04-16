import csv
import os
import pathlib

from pathlib import Path
from imutils import contours

import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf

# запускаем все на цпу
os.environ["CUDA_VISIBLE_DEVICES"] = ""
IMG_SHAPE = ()


class Predictor:
    def __init__(self, img_path):
        self.peaces_folder = os.path.join(".", "peaces", img_path)

    # ресазим изображение
    def read_img_and_resize(self, path):
        img = tf.io.read_file(path)
        img = tf.io.decode_jpeg(img, channels=IMG_SHAPE[-1])
        if IMG_SHAPE[1] is None:
            img_shape = tf.shape(img)
            scale_factor = IMG_SHAPE[0] / img_shape[0]
            img_width = scale_factor * tf.cast(img_shape[1], tf.float64)
            img_width = tf.cast(img_width, tf.int32)
        else:
            img_width = IMG_SHAPE[1]
        img = tf.image.resize(img, (IMG_SHAPE[0], img_width), method="nearest")
        return img

    # готовим модель изображение
    def prepare_model(self):
        img_height = 112
        img_width = 112
        batch_size = 64

        seed = 123

        # ['0', '1', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2', '20', '21', '22', '23', '24',
        # '25', '26', '27', '28', '29', '3', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '4', '40',
        # '41', '42', '43', '44', '45', '46', '47', '48', '49', '5', '50', '51', '52', '53', '54', '55', '56', '57',
        # '58', '59', '6', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '7', '70', '71', '72', '73',
        # '74', '75', '76', '77', '78', '79', '8', '80', '81', '82', '83', '9']
        data_dir = "../../data/development/kazakh_bw/letters/examples/"
        x_train_ds = tf.keras.utils.image_dataset_from_directory(
            data_dir,
            validation_split=0.2,
            subset="training",
            seed=seed,
            image_size=(img_height, img_width),
            batch_size=batch_size)

        class_names = x_train_ds.class_names
        print(class_names)
        print(class_names.__sizeof__())

        activation = 'relu'
        input_shape = (112, 112, 3)

        model = tf.keras.models.Sequential([
            tf.keras.layers.Conv2D(32, (5, 5), padding='same', activation='relu', input_shape=input_shape),
            tf.keras.layers.Conv2D(32, (5, 5), padding='same', activation='relu'),
            tf.keras.layers.MaxPool2D(),
            tf.keras.layers.Dropout(0.25),
            tf.keras.layers.Conv2D(64, (3, 3), padding='same', activation='relu'),
            tf.keras.layers.Conv2D(64, (3, 3), padding='same', activation='relu'),
            tf.keras.layers.MaxPool2D(strides=(2, 2)),
            tf.keras.layers.Dropout(0.25),
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dropout(0.5),
            tf.keras.layers.Dense(class_names.__sizeof__(), activation='softmax')
        ])

        model.load_weights('./checkpoints/cnn_bw_first')
        return model, class_names

    # массив букв (соответствие "номер категории" -> "порядковый номер буквы в алфавите"
    # сделано так, потому-что символьные категории с кз. символами не воспринимаются tf
    def get_alphabet(self):
        alphabet = []
        with open("../../data_synthesizer/letters.csv", encoding='utf8') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                alphabet.append(row[0])
            return alphabet

    def predict(self):
        model, class_names = self.prepare_model()
        alphabet = self.get_alphabet()

        p = Path(self.peaces_folder)
        img_paths = p.iterdir() if p.is_dir() else [p]
        word = ""
        for img_path in img_paths:
            img_path = pathlib.Path(img_path).as_posix()
            img = self.read_img_and_resize(img_path, (112, 112, 3))
            img = tf.reshape(img, (-1, 112, 112, 3))
            Y_pred = model.predict([img])
            Y_pred_classes = np.argmax(Y_pred, axis=1)
            word += alphabet[int(class_names[Y_pred_classes[0]])]

        return word

    def detect_letters(self, image):
        img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        ret, im = cv2.threshold(img_gray, 100, 255, cv2.THRESH_BINARY_INV)
        cnts, hierarchy = cv2.findContours(im, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        cnts, _ = contours.sort_contours(cnts, method="left-to-right")

        ROI_number = 0
        for c in cnts:
            area = cv2.contourArea(c)
            if area > 10:
                x, y, w, h = cv2.boundingRect(c)
                ROI = image[y:y + h, x:x + w]
                peace_number = "{:03d}".format(ROI_number)
                cv2.imwrite(os.path.join(self.peaces_folder, '/ROI_{}.jpg').format(peace_number), ROI)
                cv2.rectangle(image, (x, y), (x + w, y + h), (36, 255, 12), 1)
                ROI_number += 1
