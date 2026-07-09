# from django.contrib import admin

# # Register your models here.
from django.contrib import admin
from .models import Bus, SeatLayout


class SeatLayoutInline(admin.TabularInline):
    model = SeatLayout
    extra = 1


class BusAdmin(admin.ModelAdmin):
    list_display = ['name', 'bus_number', 'bus_type', 'total_seats', 'is_active']
    inlines = [SeatLayoutInline]


admin.site.register(Bus, BusAdmin)
admin.site.register(SeatLayout)