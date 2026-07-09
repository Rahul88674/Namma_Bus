# from django.db import models

# # Create your models here.
from django.db import models
from django.conf import settings
from routes.models import Trip
from buses.models import SeatLayout
import uuid


class TripSeat(models.Model):
    """Tracks seat status for a specific trip (not the bus in general)."""
    class Status(models.TextChoices):
        AVAILABLE = 'AVAILABLE', 'Available'
        LOCKED = 'LOCKED', 'Locked'
        BOOKED = 'BOOKED', 'Booked'

    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='trip_seats')
    seat = models.ForeignKey(SeatLayout, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.AVAILABLE)
    locked_at = models.DateTimeField(null=True, blank=True)
    locked_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        unique_together = ('trip', 'seat')

    def __str__(self):
        return f"{self.trip} - {self.seat.seat_number} ({self.status})"


class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        CONFIRMED = 'CONFIRMED', 'Confirmed'
        CANCELLED = 'CANCELLED', 'Cancelled'

    booking_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='bookings')
    total_fare = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.booking_id} - {self.user.username} - {self.status}"


class Passenger(models.Model):
    class Gender(models.TextChoices):
        MALE = 'M', 'Male'
        FEMALE = 'F', 'Female'
        OTHER = 'O', 'Other'

    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='passengers')
    trip_seat = models.ForeignKey(TripSeat, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=1, choices=Gender.choices)

    def __str__(self):
        return f"{self.name} - Seat {self.trip_seat.seat.seat_number}"