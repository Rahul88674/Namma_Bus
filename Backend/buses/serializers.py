# from rest_framework import serializers
# from .models import Bus, SeatLayout


# class SeatLayoutSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SeatLayout
#         fields = ['id', 'seat_number', 'seat_type', 'deck']


# class BusSerializer(serializers.ModelSerializer):
#     seats = SeatLayoutSerializer(many=True, read_only=True)

#     class Meta:
#         model = Bus
#         fields = ['id', 'name', 'bus_number', 'bus_type', 'total_seats', 'amenities', 'is_active', 'seats']
# from rest_framework import serializers
# from .models import Bus, SeatLayout


# class SeatLayoutSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SeatLayout
#         fields = ['id', 'seat_number', 'seat_type', 'deck']


# class BusSerializer(serializers.ModelSerializer):
#     seats = SeatLayoutSerializer(many=True, read_only=True)

#     class Meta:
#         model = Bus
#         fields = ['id', 'name', 'bus_number', 'bus_type', 'total_seats', 'amenities', 'is_active', 'seats']


# class BulkSeatCreateSerializer(serializers.Serializer):
#     seats = SeatLayoutSerializer(many=True)

#     def create(self, validated_data):
#         bus = self.context['bus']
#         seats_data = validated_data['seats']
#         # clear existing seats first (simplifies re-generating layout)
#         bus.seats.all().delete()
#         seat_objs = [SeatLayout(bus=bus, **s) for s in seats_data]
#         return SeatLayout.objects.bulk_create(seat_objs)
from rest_framework import serializers
from .models import Bus, SeatLayout


class SeatLayoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeatLayout
        fields = ['id', 'seat_number', 'seat_type', 'deck']


class BusSerializer(serializers.ModelSerializer):
    seats = SeatLayoutSerializer(many=True, read_only=True)

    class Meta:
        model = Bus
        fields = ['id', 'name', 'bus_number', 'bus_type', 'total_seats', 'amenities', 'is_active', 'seats']


class BulkSeatCreateSerializer(serializers.Serializer):
    seats = SeatLayoutSerializer(many=True)

    def create(self, validated_data):
        from bookings.models import TripSeat

        bus = self.context['bus']
        seats_data = validated_data['seats']

        # clear existing seats first (also cascades and deletes old TripSeat rows)
        bus.seats.all().delete()
        seat_objs = [SeatLayout(bus=bus, **s) for s in seats_data]
        created_seats = SeatLayout.objects.bulk_create(seat_objs)

        # sync: create TripSeat rows for ALL existing trips using this bus
        existing_trips = bus.trips.all()
        new_trip_seats = []
        for trip in existing_trips:
            for seat in created_seats:
                new_trip_seats.append(TripSeat(trip=trip, seat=seat))
        TripSeat.objects.bulk_create(new_trip_seats)

        return created_seats