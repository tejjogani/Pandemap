# Generated by Django 3.0.7 on 2020-06-28 17:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('master', '0002_auto_20200604_1700'),
        ('places', '0003_auto_20200628_1710'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='type_of_place',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='master.Place_Type'),
        ),
    ]
