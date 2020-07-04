from django.db import models
from ..master.choices import states_choices


class University_Name(models.Model):
    name = models.CharField(max_length=100)
    state = models.CharField(choices=states_choices, max_length=2)
    city = models.CharField(max_length=100)
    pincode = models.PositiveIntegerField()
    class Meta:
        verbose_name_plural = "University Names"

class Place_Type(models.Model):
    type = models.CharField(max_length=50)
    class Meta:
        verbose_name_plural = "Place Types"

    def __str__(self):
        return self.type