import cv2
import os

fnImg = 'data/production/images/aidar/rdzoea86do13h1l3/original.png'
print(os.path.isfile(fnImg))
img = cv2.imread(fnImg)
img = img[546:567, 14:125]

cv2.imwrite("test.png", img)
cv2.waitKey(0)
