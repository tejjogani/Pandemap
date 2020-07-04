from django.db import models
from ..master.models import Place_Type
from taggit.managers import TaggableManager



class Place(models.Model):
    name = models.CharField(max_length=50)
    type_of_place = models.ForeignKey(Place_Type, on_delete=models.CASCADE)
    max_people = models.IntegerField()
    http_ref = models.URLField()
    tags = TaggableManager()

    def __str__(self):
        return self.name


class Interval(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    people_count = models.IntegerField()
