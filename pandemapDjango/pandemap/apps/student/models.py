from django.db import models
from ..master.models import University_Name
from ..accounts.models import User


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField()
    university = models.ForeignKey(University_Name, on_delete=models.CASCADE)
