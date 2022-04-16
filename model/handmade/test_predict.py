import csv
import os
import pathlib
from pathlib import Path

import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf

# запускаем все на цпу

os.environ["CUDA_VISIBLE_DEVICES"] = ""


def read_img_and_resize(path, shape):
    img = tf.io.read_file(path)
    img = tf.io.decode_jpeg(img, channels=shape[-1])
    if shape[1] is None:
        img_shape = tf.shape(img)
        scale_factor = shape[0] / img_shape[0]
        img_width = scale_factor * tf.cast(img_shape[1], tf.float64)
        img_width = tf.cast(img_width, tf.int32)
    else:
        img_width = shape[1]
    img = tf.image.resize(img, (shape[0], img_width), method="nearest")
    return img


print(tf.__version__)

img_height = 112
img_width = 112
batch_size = 64

seed = 123

# ['0', '1', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '3', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '4', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '5', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '6', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '7', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '8', '80', '81', '82', '83', '9']
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
#
alphabet = []
with open("../../data_synthesizer/letters.csv", encoding='utf8') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        alphabet.append(row[0])

    # Predict the values from the testing dataset
images_folder = "C:\\Users\\epimetheus\\PycharmProjects\\kazakh_trs\\model\\handmade\\peaces"
pathlib.Path(images_folder).as_posix()

p = Path(images_folder)
img_paths = p.iterdir() if p.is_dir() else [p]
word = ""
for img_path in img_paths:
    img_path = pathlib.Path(img_path).as_posix()
    img = read_img_and_resize(img_path, (112, 112, 3))
    img = tf.reshape(img, (-1, 112, 112, 3))
    Y_pred = model.predict([img])
    Y_pred_classes = np.argmax(Y_pred, axis=1)
    word += alphabet[int(class_names[Y_pred_classes[0]])]

print(word)