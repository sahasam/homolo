import os

from django.http import Http404
from django.http.response import StreamingHttpResponse

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from stream.camera import LiveWebCam, FrameDropException, FrameConversionException

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

class CameraView(APIView):
    """
    Create HTTPStream for ip camera frames
    """
    def get(self, request, pk, format=None):
        return StreamingHttpResponse(gen(LiveWebCam(user=os.environ['CAM_USER'], password=os.environ['CAM_PSWD'], ip="192.168.55.210")), content_type='multipart/x-mixed-replace; boundary=frame')
