from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from stream import views

urlpatterns = [
    path('stream/<int:pk>/', views.CameraView.as_view())
]
