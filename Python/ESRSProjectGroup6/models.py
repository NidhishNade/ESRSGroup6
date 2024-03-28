from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=50, default="uName")
    email = models.EmailField()
    first_name = models.CharField(max_length=50)
    first_name="Member"
    last_name = models.CharField(max_length=50)
    last_name="Member"
    is_user_admin = models.BooleanField(default=False)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username


class Person(models.Model):
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)
