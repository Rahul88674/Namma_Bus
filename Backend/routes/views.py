# from django.shortcuts import render

# # Create your views here.
from rest_framework import viewsets, permissions, generics
from django.utils.dateparse import parse_date
from .models import Route, Trip
from .serializers import RouteSerializer, TripSerializer, TripCreateSerializer
from buses.views import IsAdminOrReadOnly
from django.db.models import Q
from rest_framework.response import Response


class CityListView(generics.ListAPIView):
    """Returns distinct list of all cities used as source or destination across routes."""
    permission_classes = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        sources = Route.objects.values_list('source', flat=True)
        destinations = Route.objects.values_list('destination', flat=True)
        cities = sorted(set(list(sources) + list(destinations)))
        return Response(cities)


class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    permission_classes = [IsAdminOrReadOnly]


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.filter(is_active=True)
    permission_classes = [IsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return TripCreateSerializer
        return TripSerializer


class TripSearchView(generics.ListAPIView):
    serializer_class = TripSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Trip.objects.filter(is_active=True)
        source = self.request.query_params.get('source')
        destination = self.request.query_params.get('destination')
        date = self.request.query_params.get('date')

        if source:
            qs = qs.filter(route__source__icontains=source)
        if destination:
            qs = qs.filter(route__destination__icontains=destination)
        if date:
            parsed_date = parse_date(date)
            if parsed_date:
                qs = qs.filter(departure_datetime__date=parsed_date)

        return qs.order_by('departure_datetime')