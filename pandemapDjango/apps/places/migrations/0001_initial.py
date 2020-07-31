# Generated by Django 3.0.8 on 2020-07-31 04:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('master', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('yelp_business_id', models.CharField(max_length=30)),
                ('latitude', models.DecimalField(decimal_places=10, max_digits=19)),
                ('longitude', models.DecimalField(decimal_places=10, max_digits=19)),
                ('img_url', models.URLField(blank=True)),
                ('max_people', models.IntegerField()),
                ('http_ref', models.URLField(blank=True)),
                ('tags', models.CharField(blank=True, max_length=1000)),
                ('type_of_place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='master.Place_Type')),
            ],
        ),
        migrations.CreateModel(
            name='Interval',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('people_count', models.IntegerField()),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='places.Place')),
                ('user_info', models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]