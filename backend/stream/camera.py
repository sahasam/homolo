import cv2

class FrameDropException(Exception):
    def __init__(self, message="Dropped frame. May be due to spotty internet connection or wired connection"):
        self.message = message

class FrameConversionException(Exception):
    def __init__(self, message="Could not convert cv2 frame to jpeg"):
        self.message = message

class LiveWebCam(object):
    def __init__(self, user="", password="", ip=""):
        self.video = cv2.VideoCapture(f"rtsp://{user}:{password}@{ip}/cam/realmonitor?channel=1&subtype=1")

    def __del__(self):
        self.video.release()

    def get_frame(self):
        success, image = self.video.read()
        if success:
            resize = cv2.resize(image, (640,480), interpolation = cv2.INTER_LINEAR)
            ret, jpeg = cv2.imencode('.jpg', resize)
            if not ret:
                raise FrameConversionException()
            return jpeg.tobytes()
        else:
            raise FrameDropException()