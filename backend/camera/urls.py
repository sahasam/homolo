from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from camera import views

urlpatterns = [
        path('camera/', views.CameraList.as_view()),
        path('camera/<int:pk>/', views.CameraDetail.as_view()),
        path('movement/', views.MovementList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
