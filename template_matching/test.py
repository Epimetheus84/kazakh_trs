import cv2
import numpy as np
from matplotlib import pyplot as plt
img_rgb = cv2.imread('plane_source.jpeg')
img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)

img_rgb_bad = cv2.imread('plane_source_bad.png')
img_gray_bad = cv2.cvtColor(img_rgb_bad, cv2.COLOR_BGR2GRAY)

template = cv2.imread('plane_template.jpeg', 0)

# находим темплейт на исходном изображении
height, width = template.shape[::]
res = cv2.matchTemplate(img_gray, template, cv2.TM_SQDIFF)
res_bad = cv2.matchTemplate(img_gray_bad, template, cv2.TM_SQDIFF)

plt.imshow(res, cmap='gray')

# находим координаты точек обнаруженного темплейта
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
min_val_bad, max_val_bad, min_loc_bad, max_loc_bad = cv2.minMaxLoc(res_bad)

# строим четырехугольник вокруг найденного изображения
top_left = min_loc
bottom_right = (top_left[0] + width, top_left[1] + height)
cv2.rectangle(img_rgb, top_left, bottom_right, (255, 0, 0), 2)

top_left_bad = min_loc_bad
bottom_right_bad = (top_left_bad[0] + width, top_left_bad[1] + height)
cv2.rectangle(img_rgb_bad, top_left_bad, bottom_right_bad, (255, 0, 0), 2)

# отображаем четырехугольник синим цветом
cv2.imshow("Matched image", img_rgb)x
cv2.waitKey()
cv2.destroyAllWindows()

cv2.imshow("Matched image", img_rgb_bad)
cv2.waitKey()
cv2.destroyAllWindows()