import os
import random
import statistics
import cv2
import numpy as np

from pathlib import Path
from matplotlib import pyplot as plt

# получаем изображение
test_image = cv2.imread('.\\peaces\\ROI_002.jpg')
test_image = cv2.resize(test_image, (112, 112), interpolation=cv2.INTER_AREA)

# берем все папки с примерами букв
images_folder = "C:\\Users\\epimetheus\\PycharmProjects\\kazakh_trs\\data\\development\\kazakh_bw\\letters\\examples"


def match_template(template_path, img):
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    template = cv2.imread(template_path, 0)
    height, width = template.shape[::]
    res = cv2.matchTemplate(img_gray, template, cv2.TM_SQDIFF_NORMED)

    # находим координаты точек обнаруженного темплейта
    min_v, max_v, min_l, max_l = cv2.minMaxLoc(res)
    print(min_v, max_v, min_l, max_l)
    return min_v, max_v, min_l, max_l


p = Path(images_folder)
letter_image_folders = p.iterdir() if p.is_dir() else [p]
similarity_coefficients = {}

for letter_image_folder in letter_image_folders:
    letter_image_samples = letter_image_folder.iterdir() if letter_image_folder.is_dir() else [p]
    letter_category_index = os.path.basename(letter_image_folder)
    # выбираем 3 случайных изображения 1 буквы
    letter_image_samples = list(letter_image_samples)
    if len(letter_image_samples) < 3:
        continue

    random_letter_image_samples = random.sample(letter_image_samples, 3)
    sample_similarity_coefficients = []
    for letter_image_sample_path in random_letter_image_samples:
        min_val, max_val, min_loc, max_loc = match_template(letter_image_sample_path.as_posix(), test_image)
        sample_similarity_coefficients.append(min_val)
    similarity_coefficients[letter_category_index] = statistics.fmean(sample_similarity_coefficients)

max_keys = [key for key, value in similarity_coefficients.items() if value == min(similarity_coefficients.values())]
print(max_keys)
print(similarity_coefficients)
