from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Trip
from bookings.models import TripSeat


@receiver(post_save, sender=Trip)
def create_trip_seats(sender, instance, created, **kwargs):
    if created:
        seats = instance.bus.seats.all()
        TripSeat.objects.bulk_create([
            TripSeat(trip=instance, seat=seat) for seat in seats
        ])