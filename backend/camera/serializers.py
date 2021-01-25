from rest_framework import serializers

from .models import Camera, Movement

class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = ['cam_id', 'cam_name', 'location', 'cam_status', 'cam_ip']

class MovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movement
        fields = ['movement_id', 'camera', 'time_stamp', 'person_detected', 'file_name']

class CameraDetailSerializer(serializers.ModelSerializer):
    movements = MovementSerializer(many=True)
    class Meta:
        model = Camera
        fields = ['cam_id', 'cam_name', 'movements', 'location', 'cam_status', 'cam_ip']

