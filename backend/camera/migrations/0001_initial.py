# Generated by Django 3.1.5 on 2021-01-24 23:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Camera',
            fields=[
                ('cam_id', models.IntegerField(primary_key=True, serialize=False)),
                ('cam_name', models.CharField(blank=True, max_length=40, null=True)),
                ('location', models.CharField(blank=True, max_length=30, null=True)),
                ('cam_status', models.IntegerField(blank=True, null=True)),
                ('movement', models.IntegerField(blank=True, null=True)),
                ('cam_ip', models.CharField(blank=True, max_length=40, null=True)),
            ],
            options={
                'db_table': 'camera',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Movement',
            fields=[
                ('movement_id', models.IntegerField(primary_key=True, serialize=False)),
                ('time_stamp', models.DateTimeField(blank=True, null=True)),
                ('person_detected', models.IntegerField(blank=True, null=True)),
                ('file_name', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'movement',
                'managed': False,
            },
        ),
    ]