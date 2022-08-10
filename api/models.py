from unicodedata import category
from django.db import models

class Project(models.Model):
    projectTitle =  models.CharField(max_length=100)
    projectDate = models.DateTimeField(auto_now=True)
    projectCategory  = models.CharField(max_length=50)
    def __str__(self) -> str:
        return self.projectTitle

class Screens(models.Model):
    projectID = models.ForeignKey(Project,on_delete=models.CASCADE, related_name='screens')
    screenTitle = models.CharField(max_length=50)
    def __str__(self) -> str:
        return self.screenTitle

class Controls(models.Model):
    screenID = models.ForeignKey(Screens,on_delete=models.CASCADE, related_name='controls')
    controlTitle = models.TextField()
    controlsType = models.TextField()
    def __str__(self) -> str:
        return self.controlTitle

