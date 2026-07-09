# from rest_framework.routers import DefaultRouter
# from .views import BusViewSet

# router = DefaultRouter()
# router.register('buses', BusViewSet, basename='bus')

# urlpatterns = router.urls
from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import BusViewSet, BusSeatsBulkCreateView

router = DefaultRouter()
router.register('buses', BusViewSet, basename='bus')

urlpatterns = [
    path('buses/<int:bus_id>/seats/bulk-create/', BusSeatsBulkCreateView.as_view(), name='bus-seats-bulk-create'),
] + router.urls