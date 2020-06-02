import cv2
import os

fnImg = 'data/production/images/aidar/e76cze30bzfli4ht/original.png'
print(os.path.isfile(fnImg))
img = cv2.imread(fnImg)
img = img[84:118, 8:275]

cv2.imwrite("test.png", img)
cv2.waitKey(0)
