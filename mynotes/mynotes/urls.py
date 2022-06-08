from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # 'localhost:8000' -> mynotes/url.py -> api/urls.py
    path('', include('api.urls'))
]
