from rest_framework import serializers
from .models import Data

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = '__all__'

class AvgIntensitySerializer(serializers.ModelSerializer):
    avg_intensity = serializers.IntegerField()
    total_intensity = serializers.IntegerField()
    class Meta:
        model = Data
        fields = ['topic', 'avg_intensity', 'total_intensity']