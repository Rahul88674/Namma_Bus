# from django.shortcuts import render

# # Create your views here.
from rest_framework import views, generics, permissions, status
from rest_framework.response import Response
from django.db import transaction
from django.utils import timezone
from datetime import timedelta
from .models import TripSeat, Booking, Passenger
from .serializers import CreateBookingSerializer, BookingSerializer, TripSeatSerializer
from routes.models import Trip

from rest_framework import views, generics, permissions, status
from rest_framework.response import Response
from django.db.models import Sum, Count
from django.utils import timezone
from buses.models import Bus
from routes.models import Route, Trip
from .models import Booking


class AdminStatsView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != 'ADMIN':
            return Response({"error": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

        total_buses = Bus.objects.filter(is_active=True).count()
        total_routes = Route.objects.count()
        upcoming_trips = Trip.objects.filter(is_active=True, departure_datetime__gte=timezone.now()).count()

        confirmed_bookings = Booking.objects.filter(status=Booking.Status.CONFIRMED)
        total_bookings = confirmed_bookings.count()
        total_revenue = confirmed_bookings.aggregate(total=Sum('total_fare'))['total'] or 0

        recent_bookings = confirmed_bookings.order_by('-created_at')[:5]
        recent_data = [
            {
                "booking_id": str(b.booking_id),
                "user": b.user.username,
                "route": f"{b.trip.route.source} → {b.trip.route.destination}",
                "fare": b.total_fare,
                "created_at": b.created_at,
            }
            for b in recent_bookings
        ]

        return Response({
            "total_buses": total_buses,
            "total_routes": total_routes,
            "upcoming_trips": upcoming_trips,
            "total_bookings": total_bookings,
            "total_revenue": total_revenue,
            "recent_bookings": recent_data,
        })


class TripSeatListView(generics.ListAPIView):
    """Returns seat map + status for a given trip - used to render seat selection UI."""
    serializer_class = TripSeatSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        trip_id = self.kwargs['trip_id']
        expiry_time = timezone.now() - timedelta(minutes=10)

        # auto-release expired locks before returning seat map
        TripSeat.objects.filter(
            trip_id=trip_id, status=TripSeat.Status.LOCKED, locked_at__lt=expiry_time
        ).update(status=TripSeat.Status.AVAILABLE, locked_at=None, locked_by=None)

        return TripSeat.objects.filter(trip_id=trip_id).select_related('seat')


class LockSeatView(views.APIView):
    """Lock a seat temporarily while user fills passenger details / pays."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, trip_seat_id):
        expiry_time = timezone.now() - timedelta(minutes=10)

        with transaction.atomic():
            try:
                trip_seat = TripSeat.objects.select_for_update().get(id=trip_seat_id)
            except TripSeat.DoesNotExist:
                return Response({"error": "Seat not found"}, status=status.HTTP_404_NOT_FOUND)

            if trip_seat.status == TripSeat.Status.BOOKED:
                return Response({"error": "Seat already booked"}, status=status.HTTP_400_BAD_REQUEST)

            if trip_seat.status == TripSeat.Status.LOCKED and trip_seat.locked_at and trip_seat.locked_at > expiry_time:
                if trip_seat.locked_by_id != request.user.id:
                    return Response({"error": "Seat locked by another user"}, status=status.HTTP_400_BAD_REQUEST)

            trip_seat.status = TripSeat.Status.LOCKED
            trip_seat.locked_at = timezone.now()
            trip_seat.locked_by = request.user
            trip_seat.save()

        return Response({"message": "Seat locked", "trip_seat_id": trip_seat.id})


class CreateBookingView(views.APIView):
    """Final booking creation - converts locked seats into a confirmed booking."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # serializer = CreateBookingSerializer(data=request.data)
        serializer = CreateBookingSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        trip = Trip.objects.get(id=data['trip_id'])

        with transaction.atomic():
            booking = Booking.objects.create(
                user=request.user,
                trip=trip,
                total_fare=trip.fare * len(data['passengers']),
                status=Booking.Status.CONFIRMED,
            )

            for p in data['passengers']:
                trip_seat = TripSeat.objects.select_for_update().get(id=p['trip_seat_id'])

                if trip_seat.status == TripSeat.Status.BOOKED:
                    raise Exception(f"Seat {trip_seat.seat.seat_number} was just booked by someone else.")

                trip_seat.status = TripSeat.Status.BOOKED
                trip_seat.locked_at = None
                trip_seat.locked_by = None
                trip_seat.save()

                Passenger.objects.create(
                    booking=booking,
                    trip_seat=trip_seat,
                    name=p['name'],
                    age=p['age'],
                    gender=p['gender'],
                )

        return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)


class MyBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by('-created_at')


class CancelBookingView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, booking_id):
        try:
            booking = Booking.objects.get(booking_id=booking_id, user=request.user)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

        if booking.status == Booking.Status.CANCELLED:
            return Response({"error": "Already cancelled"}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            booking.status = Booking.Status.CANCELLED
            booking.save()
            TripSeat.objects.filter(passenger__booking=booking).update(
                status=TripSeat.Status.AVAILABLE, locked_at=None, locked_by=None
            )

        return Response({"message": "Booking cancelled"})