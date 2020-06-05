from django.db import models
from ..master.models import Place_Type


class Place(models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(Place_Type, max_length=2)
    max_people = models.IntegerField()


class Interval(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    people_count = models.IntegerField()
