from rest_framework import serializers
from .models import Route, Trip
from buses.serializers import BusSerializer


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'source', 'destination', 'distance_km', 'duration']


class TripSerializer(serializers.ModelSerializer):
    bus = BusSerializer(read_only=True)
    route = RouteSerializer(read_only=True)
    available_seats_count = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id', 'bus', 'route', 'departure_datetime', 'arrival_datetime', 'fare', 'available_seats_count']

    def get_available_seats_count(self, obj):
        return obj.trip_seats.filter(status='AVAILABLE').count()


class TripCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['id', 'bus', 'route', 'departure_datetime', 'arrival_datetime', 'fare', 'is_active']