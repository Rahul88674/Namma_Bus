from django.urls import path
# from .views import (
#     TripSeatListView, LockSeatView, CreateBookingView,
#     MyBookingsView, CancelBookingView
# )

# urlpatterns = [
#     path('trip/<int:trip_id>/seats/', TripSeatListView.as_view(), name='trip-seats'),
#     path('lock-seat/<int:trip_seat_id>/', LockSeatView.as_view(), name='lock-seat'),
#     path('create/', CreateBookingView.as_view(), name='create-booking'),
#     path('my-bookings/', MyBookingsView.as_view(), name='my-bookings'),
#     path('cancel/<str:booking_id>/', CancelBookingView.as_view(), name='cancel-booking'),
# ]
from .views import (
    TripSeatListView, LockSeatView, CreateBookingView,
    MyBookingsView, CancelBookingView, AdminStatsView
)

urlpatterns = [
    path('trip/<int:trip_id>/seats/', TripSeatListView.as_view(), name='trip-seats'),
    path('lock-seat/<int:trip_seat_id>/', LockSeatView.as_view(), name='lock-seat'),
    path('create/', CreateBookingView.as_view(), name='create-booking'),
    path('my-bookings/', MyBookingsView.as_view(), name='my-bookings'),
    path('cancel/<str:booking_id>/', CancelBookingView.as_view(), name='cancel-booking'),
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
]