import os

import cv2
from matplotlib import pyplot as plt

# img_rgb = cv2.imread('plane_source.jpeg')
img_rgb = "C:\\Users\\epimetheus\\PycharmProjects\\kazakh_trs\\data\\development\\kazakh_bw\\letters\\examples"
img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)

img_rgb_bad = cv2.imread('plane_source_bad.png')
img_gray_bad = cv2.cvtColor(img_rgb_bad, cv2.COLOR_BGR2GRAY)

template = cv2.imread('plane_template.jpeg', 0)

# находим темплейт на исходном изображении
height, width = template.shape[::]
res = cv2.matchTemplate(img_gray, template, cv2.TM_SQDIFF)

# 92991088.0
# 92990992.0
plt.imshow(res, cmap='gray')

# находим координаты точек обнаруженного темплейта
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
print(max_val)

# строим четырехугольник вокруг найденного изображения
top_left = min_loc
bottom_right = (top_left[0] + width, top_left[1] + height)
cv2.rectangle(img_rgb, top_left, bottom_right, (255, 0, 0), 2)

# отображаем четырехугольник синим цветом
cv2.imshow("Matched image", img_rgb)
cv2.waitKey()
cv2.destroyAllWindows()
