# from django.urls import path
# from rest_framework.routers import DefaultRouter
# from .views import RouteViewSet, TripViewSet, TripSearchView

# router = DefaultRouter()
# router.register('routes', RouteViewSet, basename='route')
# router.register('trips', TripViewSet, basename='trip')

# urlpatterns = [
#     path('search/', TripSearchView.as_view(), name='trip-search'),
# ] + router.urls
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import RouteViewSet, TripViewSet, TripSearchView, CityListView

router = DefaultRouter()
router.register('routes', RouteViewSet, basename='route')
router.register('trips', TripViewSet, basename='trip')

urlpatterns = [
    path('search/', TripSearchView.as_view(), name='trip-search'),
    path('cities/', CityListView.as_view(), name='city-list'),
] + router.urls