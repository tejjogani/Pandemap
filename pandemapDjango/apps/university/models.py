from django.db import models
from ..master.models import University_Name
from ..accounts.models import User


class University(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.ForeignKey(University_Name, on_delete=models.CASCADE)
    email = models.EmailField()
    class Meta:
        verbose_name_plural = "Universities"

class Alert(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=120)
    body = models.CharField(max_length=5000)