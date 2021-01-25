from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from camera.models import Camera, Movement
from camera.serializers import CameraSerializer, MovementSerializer, CameraDetailSerializer

class CameraList(APIView):
    """
    List all cameras, or create a new camera
    """
    def get(self, request, format=None):
        cameras = Camera.objects.all()
        serializer = CameraDetailSerializer(cameras, many=True)
        return Response(serializer.data)

class CameraDetail(APIView):
    """
    Retrieve all information related to a single camera.
    """
    def get_object(self, pk):
        try:
            return Camera.objects.get(pk=pk)
        except Camera.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        camera_details = self.get_object(pk)
        serializer = CameraDetailSerializer(camera_details)
        return Response(serializer.data)

class MovementList(APIView):
    """
    List all movements
    """
    def get(self, request, format=None):
        movements = Movement.objects.all()
        serializer = MovementSerializer(movements, many=True)
        return Response(serializer.data)
