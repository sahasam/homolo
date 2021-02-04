import os

from django.http import Http404
from django.http.response import StreamingHttpResponse

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from camera.models import Camera
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
    def get_object(self, pk):
        try:
            return Camera.objects.get(pk=pk)
        except Camera.DoesNotExist:
            raise Http404

    
    def get(self, request, pk, format=None):
        camera = self.get_object(pk=pk)
        return StreamingHttpResponse(gen(LiveWebCam(user=os.environ['CAM_USER'], password=os.environ['CAM_PSWD'], ip=camera.cam_ip)), content_type='multipart/x-mixed-replace; boundary=frame')
