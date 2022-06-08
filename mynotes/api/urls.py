from django.urls import path
from . import views

urlpatterns = [
    # from api/views.py
    path('', views.getRoutes, name="routes"), 
]