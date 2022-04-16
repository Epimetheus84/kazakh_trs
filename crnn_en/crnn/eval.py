import argparse
import pprint
import os
import yaml

from pathlib import Path
from dataset_factory import DatasetBuilder
from losses import CTCLoss
from metrics import SequenceAccuracy, EditDistance
from models import build_model

# save_dir = Path('../data')
config_file = Path("../configs/ksd.yml")

latest = Path("../data/20_1.5819_0.8766.h5")

with open(config_file) as f:
    config = yaml.load(f, Loader=yaml.Loader)['eval']
pprint.pprint(config)

dataset_builder = DatasetBuilder(**config['dataset_builder'])
ds = dataset_builder(config['ann_paths'], config['batch_size'], False)
print(dataset_builder.num_classes)
model = build_model(dataset_builder.num_classes,
                    weight=latest,
                    img_shape=config['dataset_builder']['img_shape'])
model.compile(loss=CTCLoss(), metrics=[SequenceAccuracy(), EditDistance()])
model.evaluate(ds)
