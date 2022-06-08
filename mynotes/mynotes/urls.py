from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # get every url from api/urls.py
    path('', include('api.urls')) 
]
