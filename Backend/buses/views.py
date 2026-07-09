# # from django.shortcuts import render

# # # Create your views here.
# from rest_framework import viewsets, permissions
# from .models import Bus
# from .serializers import BusSerializer


# class IsAdminOrReadOnly(permissions.BasePermission):
#     def has_permission(self, request, view):
#         if request.method in permissions.SAFE_METHODS:
#             return True
#         return request.user.is_authenticated and request.user.role == 'ADMIN'


# class BusViewSet(viewsets.ModelViewSet):
#     queryset = Bus.objects.filter(is_active=True)
#     serializer_class = BusSerializer
#     permission_classes = [IsAdminOrReadOnly]
from rest_framework import viewsets, permissions, views, status
from rest_framework.response import Response
from .models import Bus
from .serializers import BusSerializer, BulkSeatCreateSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role == 'ADMIN'


class BusViewSet(viewsets.ModelViewSet):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    permission_classes = [IsAdminOrReadOnly]


class BusSeatsBulkCreateView(views.APIView):
    permission_classes = [IsAdminOrReadOnly]

    def post(self, request, bus_id):
        try:
            bus = Bus.objects.get(id=bus_id)
        except Bus.DoesNotExist:
            return Response({"error": "Bus not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = BulkSeatCreateSerializer(data=request.data, context={'bus': bus})
        serializer.is_valid(raise_exception=True)
        seats = serializer.save()

        return Response(
            {"message": f"{len(seats)} seats created", "seats": [s.id for s in seats]},
            status=status.HTTP_201_CREATED
        )