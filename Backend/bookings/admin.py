# from django.contrib import admin

# # Register your models here.
from django.contrib import admin
from .models import TripSeat, Booking, Passenger


class PassengerInline(admin.TabularInline):
    model = Passenger
    extra = 0


class BookingAdmin(admin.ModelAdmin):
    list_display = ['booking_id', 'user', 'trip', 'total_fare', 'status', 'created_at']
    inlines = [PassengerInline]


admin.site.register(TripSeat)
admin.site.register(Booking, BookingAdmin)
admin.site.register(Passenger)