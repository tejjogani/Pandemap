from rest_framework.serializers import ModelSerializer
from .models import Place, Interval

class PlaceSerializer(ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'

class IntervalSerializer(ModelSerializer):
    class Meta:
        model = Interval
        fields = '__all__'