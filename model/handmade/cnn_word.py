import csv
import os

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import tensorflow as tf
# запускаем все на цпу
from numpy import unicode

from tensorflow import keras
from tensorflow.keras import layers

from model.handmade.losses import CTCLoss
from model.handmade.metrics import SequenceAccuracy, EditDistance

os.environ["CUDA_VISIBLE_DEVICES"] = ""


class epochCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs=None):
        if logs is None:
            logs = {}
        if logs.get('acc') > 0.995:
            print("\nReached 99.5% accuracy so cancelling training!")
            self.model.stop_training = True


def unicode_csv_reader(utf8_data, dialect=csv.excel, **kwargs):
    csv_reader = csv.reader(utf8_data, dialect=dialect, **kwargs)
    for row in csv_reader:
        yield [unicode(cell, 'utf-8') for cell in row]


print(tf.__version__)

batch_size = 64
input_shape = (32, None, 3)

seed = 123

alphabet = []
with open("../../data_synthesizer/letters.csv", encoding='utf8') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        alphabet.append(row[0])

data_dir = "../../data/development/kazakh/word/examples/"
x_train_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="training",
    seed=seed,
    image_size=input_shape,
    batch_size=batch_size)

x_test_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="validation",
    seed=seed,
    image_size=input_shape,
    batch_size=batch_size)

class_names = x_train_ds.class_names
print(class_names)

plt.figure(figsize=(10, 10))
for images, labels in x_train_ds.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)

activation = 'relu'
epochs = 10
use_saved = False


# model = tf.keras.Model([
#     tf.keras.layers.Conv2D(64, 3, padding='same', activation='relu', input_shape=input_shape),
#     tf.keras.layers.MaxPool2D(pool_size=2, padding="same"),
#     tf.keras.layers.Conv2D(128, 3, padding='same', activation='relu'),
#     tf.keras.layers.MaxPool2D(pool_size=2, padding="same"),
#     tf.keras.layers.Conv2D(256, 3, padding='same', activation='relu', use_bias=False),
#     tf.keras.layers.BatchNormalization(),
#     tf.keras.layers.Activation('relu'),
#     tf.keras.layers.Conv2D(256, 3, padding='same', activation='relu'),
#     tf.keras.layers.MaxPool2D(pool_size=2, strides=(2, 1), padding="same"),
#     tf.keras.layers.Conv2D(512, 3, padding='same', activation='relu', use_bias=False),
#     tf.keras.layers.BatchNormalization(),
#     tf.keras.layers.Activation('relu'),
#     tf.keras.layers.Conv2D(512, 3, padding='same', activation='relu'),
#     tf.keras.layers.MaxPool2D(pool_size=2, strides=(2, 1), padding="same"),
#     tf.keras.layers.Conv2D(512, 2, padding='same', activation='relu', use_bias=False),
#     tf.keras.layers.BatchNormalization(),
#     tf.keras.layers.Activation('relu'),
#     tf.keras.layers.Reshape((-1, 512)),
#     tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(units=256, return_sequences=True)),
#     tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(units=256, return_sequences=True)),
#     tf.keras.layers.Dense(units=len(alphabet), name='logits')
# ])
save_dir = "./checkpoints_words/"


def vgg_style(x):
    """
    The original feature extraction structure from CRNN paper.
    Related paper: https://ieeexplore.ieee.org/abstract/document/7801919
    """
    x = layers.Conv2D(
        64, 3, padding='same', activation='relu', name='conv1')(x)
    x = layers.MaxPool2D(pool_size=2, padding='same', name='pool1')(x)

    x = layers.Conv2D(
        128, 3, padding='same', activation='relu', name='conv2')(x)
    x = layers.MaxPool2D(pool_size=2, padding='same', name='pool2')(x)

    x = layers.Conv2D(256, 3, padding='same', use_bias=False, name='conv3')(x)
    x = layers.BatchNormalization(name='bn3')(x)
    x = layers.Activation('relu', name='relu3')(x)
    x = layers.Conv2D(
        256, 3, padding='same', activation='relu', name='conv4')(x)
    x = layers.MaxPool2D(
        pool_size=2, strides=(2, 1), padding='same', name='pool4')(x)

    x = layers.Conv2D(512, 3, padding='same', use_bias=False, name='conv5')(x)
    x = layers.BatchNormalization(name='bn5')(x)
    x = layers.Activation('relu', name='relu5')(x)
    x = layers.Conv2D(
        512, 3, padding='same', activation='relu', name='conv6')(x)
    x = layers.MaxPool2D(
        pool_size=2, strides=(2, 1), padding='same', name='pool6')(x)

    x = layers.Conv2D(512, 2, use_bias=False, name='conv7')(x)
    x = layers.BatchNormalization(name='bn7')(x)
    x = layers.Activation('relu', name='relu7')(x)

    x = layers.Reshape((-1, 512), name='reshape7')(x)
    return x


def build_model(num_classes,
                weight=None,
                preprocess=None,
                postprocess=None,
                img_shape=(32, None, 3),
                model_name='crnn'):
    x = img_input = keras.Input(shape=img_shape)
    if preprocess is not None:
        x = preprocess(x)

    x = vgg_style(x)
    x = layers.Bidirectional(
        layers.LSTM(units=256, return_sequences=True), name='bi_lstm1')(x)
    x = layers.Bidirectional(
        layers.LSTM(units=256, return_sequences=True), name='bi_lstm2')(x)
    x = layers.Dense(units=num_classes, name='logits')(x)

    if postprocess is not None:
        x = postprocess(x)

    model = keras.Model(inputs=img_input, outputs=x, name=model_name)
    if weight is not None:
        model.load_weights(weight, by_name=True, skip_mismatch=True)
    return model


lr_schedule = keras.optimizers.schedules.CosineDecay(initial_learning_rate=0.0001, decay_steps=600000, alpha=0.01)

model = build_model(len(alphabet),
                    weight=None,
                    img_shape=input_shape)

model.compile(optimizer=keras.optimizers.Adam(lr_schedule),
              loss=CTCLoss(), metrics=[SequenceAccuracy()])

model.summary()

model_prefix = '{epoch}_{val_loss:.4f}_{val_sequence_accuracy:.4f}'
model_path = f'{save_dir}/{model_prefix}.h5'
callbacks = [
    keras.callbacks.ModelCheckpoint(model_path,
                                    save_weights_only=True),
    keras.callbacks.TensorBoard(log_dir=f'{save_dir}/logs', histogram_freq=1, profile_batch=0)
]

model.fit(x_train_ds, epochs=10, callbacks=callbacks,
          validation_data=x_test_ds)
