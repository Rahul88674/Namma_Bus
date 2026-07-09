# from django.db import models

# # Create your models here.
from django.db import models
from buses.models import Bus


class Route(models.Model):
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    distance_km = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    duration = models.DurationField(help_text="Expected travel duration e.g. 5:30:00")

    class Meta:
        unique_together = ('source', 'destination')

    def __str__(self):
        return f"{self.source} → {self.destination}"


class Trip(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='trips')
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='trips')
    departure_datetime = models.DateTimeField()
    arrival_datetime = models.DateTimeField()
    fare = models.DecimalField(max_digits=8, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.bus.name} | {self.route} | {self.departure_datetime.strftime('%d-%b %H:%M')}"