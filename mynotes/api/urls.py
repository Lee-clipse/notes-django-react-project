from django.urls import path
from . import views

urlpatterns = [
    # mynotes/urls.py -> api/urls.py -> api/views.py
    path('', views.getRoutes, name="my_routes"), 
]