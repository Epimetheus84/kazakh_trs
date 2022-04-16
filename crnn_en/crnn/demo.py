import argparse
from pathlib import Path

import yaml
import tensorflow as tf
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

from tensorflow import keras

images_folder = Path("../demo_data")
config_file = Path("../configs/ksd.yml")
saved_model_dir = Path("../saved_model")

with open(config_file) as f:
    config = yaml.load(f, Loader=yaml.Loader)['dataset_builder']


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
    plt.imshow(img)
    plt.show()
    return img


model = keras.models.load_model(saved_model_dir, compile=False)

p = Path(images_folder)
img_paths = p.iterdir() if p.is_dir() else [p]
for img_path in img_paths:
    img = read_img_and_resize(str(img_path), config['img_shape'])
    img = tf.expand_dims(img, 0)

    predicted = model.predict(img)
    outputs = model(img)
    pred = outputs[0].numpy()
    print(pred)
    print(f'Path: {img_path},y_pred: {outputs[0].numpy()}, '
          f'probability: {outputs[1].numpy()}')
