import argparse
import pprint
import os
import yaml
import tensorflow as tf

from pathlib import Path
from dataset_factory import DatasetBuilder
from losses import CTCLoss
from metrics import SequenceAccuracy, EditDistance
from models import build_model

# save_dir = Path('../data')
config_file = Path("../configs/ksd.yml")

latest = Path("../data/12_1.7755_0.8065.h5")


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
    img = tf.image.resize(img, (shape[0], img_width)) / 255.0
    return img


with open(config_file) as f:
    config = yaml.load(f, Loader=yaml.Loader)['eval']
pprint.pprint(config)

dataset_builder = DatasetBuilder(**config['dataset_builder'])
ds = dataset_builder(config['ann_paths'], config['batch_size'], False)
model = build_model(dataset_builder.num_classes,
                    weight=latest,
                    img_shape=config['dataset_builder']['img_shape'])
# model.compile(loss=CTCLoss(), metrics=[SequenceAccuracy(), EditDistance()])
img = read_img_and_resize("../demo_data/0.jpg", config['dataset_builder']['img_shape'])
img = tf.expand_dims(img, 0)

predicted = model.predict(img)
print(predicted)
