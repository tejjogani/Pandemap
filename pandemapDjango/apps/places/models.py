from django.db import models
from ..master.models import Place_Type
from taggit.managers import TaggableManager
from ..accounts.models import User



class Place(models.Model):
    name = models.CharField(max_length=50)
    yelp_business_id = models.CharField(max_length=30)
    latitude = models.DecimalField(max_digits=19, decimal_places=10)
    longitude = models.DecimalField(max_digits=19, decimal_places=10)
    img_url = models.URLField(blank=True)
    type_of_place = models.ForeignKey(Place_Type, on_delete=models.CASCADE)
    max_people = models.IntegerField()
    http_ref = models.URLField(blank=True)
    tags = models.CharField(max_length=1000, blank=True)

    def __str__(self):
        return self.name


class Interval(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    people_count = models.IntegerField()
    user_info = models.ManyToManyField(User, blank=True)