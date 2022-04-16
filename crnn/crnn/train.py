import argparse
import pprint
from pathlib import Path

import tensorflow as tf
import yaml

from tensorflow import keras

from dataset_factory import DatasetBuilder
from losses import CTCLoss
from metrics import SequenceAccuracy
from models import build_model

parser = argparse.ArgumentParser()

save_dir = Path("../data")
config_file = Path("../configs/ksd.yml")

with config_file.open() as f:
    config = yaml.load(f, Loader=yaml.Loader)['train']
pprint.pprint(config)

save_dir.mkdir(exist_ok=True)
if list(save_dir.iterdir()):
    raise ValueError(f'{save_dir} is not a empty folder')

strategy = tf.distribute.MirroredStrategy()
batch_size = config['batch_size_per_replica'] * strategy.num_replicas_in_sync

dataset_builder = DatasetBuilder(**config['dataset_builder'])
train_ds = dataset_builder(config['train_ann_paths'], batch_size, True)
val_ds = dataset_builder(config['val_ann_paths'], batch_size, False)

with strategy.scope():
    lr_schedule = keras.optimizers.schedules.CosineDecay(
        **config['lr_schedule'])
    model = build_model(dataset_builder.num_classes,
                        weight=config.get('weight'),
                        img_shape=config['dataset_builder']['img_shape'])
    model.compile(optimizer=keras.optimizers.Adam(lr_schedule),
                  loss=CTCLoss(), metrics=[SequenceAccuracy()])

model.summary()

model_prefix = '{epoch}_{val_loss:.4f}_{val_sequence_accuracy:.4f}'
model_path = f'{save_dir}/{model_prefix}.h5'
callbacks = [
    keras.callbacks.ModelCheckpoint(model_path,
                                    save_weights_only=True),
    keras.callbacks.TensorBoard(log_dir=f'{save_dir}/logs',
                                **config['tensorboard'])
]

model.fit(train_ds, epochs=config['epochs'], callbacks=callbacks,
          validation_data=val_ds)
