import os
import csv

import tensorflow as tf
import seaborn as sns
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

from keras import backend as K

# запускаем все на цпу
from numpy import unicode

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

img_height = 112
img_width = 112
batch_size = 64

seed = 123

# df = pd.read_csv('../../data/development/kazakh_bw/letters/samples.csv', encoding='utf8')
# training_data_labels = df['category'].to_list()

data_dir = "../../data/development/kazakh_bw/letters/examples/"
x_train_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="training",
    seed=seed,
    image_size=(img_height, img_width),
    batch_size=batch_size)

x_test_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="validation",
    seed=seed,
    image_size=(img_height, img_width),
    batch_size=batch_size)

class_names = x_train_ds.class_names
print(class_names)
print(class_names.__sizeof__())

plt.figure(figsize=(10, 10))
for images, labels in x_train_ds.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        # plt.imshow(images[i].numpy().astype("uint8"))
        # plt.title(class_names[labels[i]])
        # plt.axis("off")

# plt.show()

activation = 'relu'
input_shape = (112, 112, 3)
epochs = 10
use_saved = False

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

model.compile(optimizer=tf.keras.optimizers.RMSprop(epsilon=1e-08), loss='sparse_categorical_crossentropy',
              metrics=['acc'])
callbacks = epochCallback()

if not use_saved:
    history = model.fit(x_train_ds,
                        epochs=epochs,
                        callbacks=[callbacks])
    model.save_weights('./checkpoints/cnn_bw_first')

else:
    model.load_weights('./checkpoints/cnn_bw_first')
#
# fig, ax = plt.subplots(2, 1)
# ax[0].plot(history.history['loss'], color='b', label="Training Loss")
# ax[0].plot(history.history['val_loss'], color='r', label="Validation Loss", axes=ax[0])
# legend = ax[0].legend(loc='best', shadow=True)
#
# ax[1].plot(history.history['acc'], color='b', label="Training Accuracy")
# ax[1].plot(history.history['val_acc'], color='r', label="Validation Accuracy")
# legend = ax[1].legend(loc='best', shadow=True)
#
alphabet = []
with open("../../data_synthesizer/letters.csv", encoding='utf8') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        alphabet.append(row[0])

test_loss, test_acc = model.evaluate(x_test_ds)
print(test_loss, test_acc)

# Predict the values from the testing dataset
for images, labels in x_train_ds.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        img = images[i].numpy().astype("uint8")
        plt.imshow(img)
        Y_pred = model.predict(images)
        Y_pred_classes = np.argmax(Y_pred, axis=1)
        plt.title(alphabet[int(class_names[Y_pred_classes[i]])])
        plt.axis("off")


plt.show()

#
# # for elem in x_test_ds.take(1):
# #   imgs = elem[0].numpy()
# #   for img in imgs:
# #     plt.imshow(images[i].numpy().astype("uint8"))
#
# # Convert predictions classes to one hot vectors
# # # Convert testing observations to one hot vectors
# for predicted_class_index in Y_pred_classes:
#     print(class_names[predicted_class_index])
# compute the confusion matrix
