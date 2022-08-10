from dataclasses import field
import imp
from pyexpat import model
from django.urls import clear_script_prefix
from rest_framework import serializers
from .models import Project, Screens,Controls

class ProjectSerializers(serializers.ModelSerializer):
    class Meta:
        model =  Project
        fields = '__all__'

class ScreenSerializers(serializers.ModelSerializer):
    class Meta:
        model =  Screens
        fields = '__all__'

class ControlSerializers(serializers.ModelSerializer):
    class Meta:
        model =  Controls
        fields = '__all__'