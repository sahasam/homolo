from django.db import models

class Camera(models.Model):
    cam_id = models.IntegerField(primary_key=True)
    cam_name = models.CharField(max_length=40, blank=True, null=True)
    location = models.CharField(max_length=30, blank=True, null=True)
    cam_status = models.IntegerField(blank=True, null=True)
    cam_ip = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'camera'


class Movement(models.Model):
    movement_id = models.IntegerField(primary_key=True)
    camera = models.ForeignKey(to=Camera, related_name='movements', on_delete=models.CASCADE)
    time_stamp = models.DateTimeField(blank=True, null=True)
    person_detected = models.IntegerField(blank=True, null=True)
    file_name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movement'
