from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from camera.models import Camera, Movement
from camera.serializers import CameraSerializer

from stream.camera import LiveWebCam, FrameDropException, FrameConversionException

class CameraView(APIView):
    """
    Create HTTPStream for ip camera frames
    """
    def get(self, request, pk, format=None):
        cameras = Camera.objects.filter(cam_id=pk)
        serializer = CameraSerializer(cameras, many=True)
        return Response(serializer.data)
