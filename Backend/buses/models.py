# from django.db import models

# # Create your models here.
from django.db import models


class Bus(models.Model):
    class BusType(models.TextChoices):
        AC_SEATER = 'AC_SEATER', 'AC Seater'
        NON_AC_SEATER = 'NON_AC_SEATER', 'Non-AC Seater'
        AC_SLEEPER = 'AC_SLEEPER', 'AC Sleeper'
        NON_AC_SLEEPER = 'NON_AC_SLEEPER', 'Non-AC Sleeper'

    name = models.CharField(max_length=100)
    bus_number = models.CharField(max_length=20, unique=True)
    bus_type = models.CharField(max_length=20, choices=BusType.choices)
    total_seats = models.PositiveIntegerField()
    amenities = models.CharField(max_length=255, blank=True, help_text="Comma separated e.g. WiFi,Charging Point,Blanket")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.bus_number})"


class SeatLayout(models.Model):
    class SeatType(models.TextChoices):
        SEATER = 'SEATER', 'Seater'
        SLEEPER = 'SLEEPER', 'Sleeper'

    class Deck(models.TextChoices):
        LOWER = 'LOWER', 'Lower'
        UPPER = 'UPPER', 'Upper'

    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='seats')
    seat_number = models.CharField(max_length=10)  # e.g. "L1", "U5"
    seat_type = models.CharField(max_length=10, choices=SeatType.choices, default=SeatType.SEATER)
    deck = models.CharField(max_length=10, choices=Deck.choices, default=Deck.LOWER)

    class Meta:
        unique_together = ('bus', 'seat_number')
        ordering = ['seat_number']

    def __str__(self):
        return f"{self.bus.bus_number} - {self.seat_number}"