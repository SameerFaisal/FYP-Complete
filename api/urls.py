from . import views
from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('insert/', csrf_exempt(views.insert)),
    path('get/', views.get_screens),
    path('getcontrols/', views.get_controls),
    path('insertview/<int:pk>',views.insertview),
    path('wireframe/', views.get_wireframe),
    path('onescreengenrate/', views.onescreengenrate),
    path('screens/<int:pk>', views.insertview),
    path('controls/<int:pk>', views.controls),
    path('projects/', views.getproject),    
]
