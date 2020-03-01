import cv2


class Detector:
    @staticmethod
    def get_rect(input_file, ele_size=(8, 2)):  #
        img = cv2.imread(input_file)
        if len(img.shape) == 3:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img_sobel = cv2.Sobel(img, cv2.CV_8U, 1, 0)  # same as default,None,3,1,0,cv2.BORDER_DEFAULT)
        img_threshold = cv2.threshold(img_sobel, 0, 255, cv2.THRESH_OTSU + cv2.THRESH_BINARY)
        element = cv2.getStructuringElement(cv2.MORPH_RECT, ele_size)
        img_threshold = cv2.morphologyEx(img_threshold[1], cv2.MORPH_CLOSE, element)
        res = cv2.findContours(img_threshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        if cv2.__version__.split(".")[0] == '3':
            _, contours, hierarchy = res
        else:
            contours, hierarchy = res
        Rect = [cv2.boundingRect(i) for i in contours if i.shape[0] > 100]
        RectP = [(int(i[0] - i[2] * 0.08), int(i[1] - i[3] * 0.08), int(i[0] + i[2] * 1.1), int(i[1] + i[3] * 1.1)) for i in
                 Rect]
        print(RectP)
        return RectP