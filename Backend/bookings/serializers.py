# from rest_framework import serializers
# from django.utils import timezone
# from datetime import timedelta
# from .models import TripSeat, Booking, Passenger
# from routes.serializers import TripSerializer



# class TripSeatSerializer(serializers.ModelSerializer):
#     seat_number = serializers.CharField(source='seat.seat_number', read_only=True)
#     seat_type = serializers.CharField(source='seat.seat_type', read_only=True)
#     deck = serializers.CharField(source='seat.deck', read_only=True)

#     class Meta:
#         model = TripSeat
#         fields = ['id', 'seat_number', 'seat_type', 'deck', 'status']


# class PassengerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Passenger
#         fields = ['id', 'trip_seat', 'name', 'age', 'gender']


# class BookingSerializer(serializers.ModelSerializer):
#     passengers = PassengerSerializer(many=True, read_only=True)

#     class Meta:
#         model = Booking
#         fields = ['id', 'booking_id', 'trip', 'total_fare', 'status', 'created_at', 'passengers']


# # class CreateBookingSerializer(serializers.Serializer):
# #     trip_id = serializers.IntegerField()
# #     passengers = serializers.ListField(
# #         child=serializers.DictField(), allow_empty=False
# #     )
# #     # each passenger dict: {trip_seat_id, name, age, gender}

# #     def validate(self, attrs):
# #         trip_seat_ids = [p['trip_seat_id'] for p in attrs['passengers']]

# #         # lock expiry window - seats locked more than 10 min ago are treated as available again
# #         expiry_time = timezone.now() - timedelta(minutes=10)

# #         seats = TripSeat.objects.filter(id__in=trip_seat_ids, trip_id=attrs['trip_id'])

# #         if seats.count() != len(trip_seat_ids):
# #             raise serializers.ValidationError("One or more seats invalid for this trip.")

# #         for seat in seats:
# #             if seat.status == TripSeat.Status.BOOKED:
# #                 raise serializers.ValidationError(f"Seat {seat.seat.seat_number} is already booked.")
# #             if seat.status == TripSeat.Status.LOCKED and seat.locked_at and seat.locked_at > expiry_time:
# #                 raise serializers.ValidationError(f"Seat {seat.seat.seat_number} is currently locked by another user.")

# #         return attrs
# class CreateBookingSerializer(serializers.Serializer):
#     trip_id = serializers.IntegerField()
#     passengers = serializers.ListField(
#         child=serializers.DictField(), allow_empty=False
#     )

#     def validate(self, attrs):
#         request = self.context.get('request')
#         trip_seat_ids = [p['trip_seat_id'] for p in attrs['passengers']]

#         expiry_time = timezone.now() - timedelta(minutes=10)

#         seats = TripSeat.objects.filter(id__in=trip_seat_ids, trip_id=attrs['trip_id'])

#         if seats.count() != len(trip_seat_ids):
#             raise serializers.ValidationError("One or more seats invalid for this trip.")

#         for seat in seats:
#             if seat.status == TripSeat.Status.BOOKED:
#                 raise serializers.ValidationError(f"Seat {seat.seat.seat_number} is already booked.")

#             if seat.status == TripSeat.Status.LOCKED and seat.locked_at and seat.locked_at > expiry_time:
#                 # allow if the current user is the one who locked it
#                 if seat.locked_by_id != request.user.id:
#                     raise serializers.ValidationError(f"Seat {seat.seat.seat_number} is currently locked by another user.")

#         return attrs
from rest_framework import serializers
from django.utils import timezone
from datetime import timedelta
from .models import TripSeat, Booking, Passenger
from routes.serializers import TripSerializer


class TripSeatSerializer(serializers.ModelSerializer):
    seat_number = serializers.CharField(source='seat.seat_number', read_only=True)
    seat_type = serializers.CharField(source='seat.seat_type', read_only=True)
    deck = serializers.CharField(source='seat.deck', read_only=True)

    class Meta:
        model = TripSeat
        fields = ['id', 'seat_number', 'seat_type', 'deck', 'status']


class PassengerSerializer(serializers.ModelSerializer):
    seat_number = serializers.CharField(source='trip_seat.seat.seat_number', read_only=True)
    deck = serializers.CharField(source='trip_seat.seat.deck', read_only=True)

    class Meta:
        model = Passenger
        fields = ['id', 'trip_seat', 'seat_number', 'deck', 'name', 'age', 'gender']


class BookingSerializer(serializers.ModelSerializer):
    passengers = PassengerSerializer(many=True, read_only=True)
    trip = TripSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'booking_id', 'trip', 'total_fare', 'status', 'created_at', 'passengers']


class CreateBookingSerializer(serializers.Serializer):
    trip_id = serializers.IntegerField()
    passengers = serializers.ListField(
        child=serializers.DictField(), allow_empty=False
    )

    def validate(self, attrs):
        request = self.context.get('request')
        trip_seat_ids = [p['trip_seat_id'] for p in attrs['passengers']]

        expiry_time = timezone.now() - timedelta(minutes=10)

        seats = TripSeat.objects.filter(id__in=trip_seat_ids, trip_id=attrs['trip_id'])

        if seats.count() != len(trip_seat_ids):
            raise serializers.ValidationError("One or more seats invalid for this trip.")

        for seat in seats:
            if seat.status == TripSeat.Status.BOOKED:
                raise serializers.ValidationError(f"Seat {seat.seat.seat_number} is already booked.")

            if seat.status == TripSeat.Status.LOCKED and seat.locked_at and seat.locked_at > expiry_time:
                if seat.locked_by_id != request.user.id:
                    raise serializers.ValidationError(f"Seat {seat.seat.seat_number} is currently locked by another user.")

        return attrs