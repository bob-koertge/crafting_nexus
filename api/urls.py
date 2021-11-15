from django.urls import path
from django.conf.urls import include

from rest_framework import routers
from .views import PatternViewSet, PublisherViewSet, UserViewSet, PatternTutorialViewSet

router = routers.DefaultRouter()
router.register('registration', UserViewSet, basename="User")
router.register('patterns', PatternViewSet, basename='Pattern')
router.register('pattern/publishers', PublisherViewSet, basename='Publisher')
router.register('pattern/variations', PatternTutorialViewSet, basename="Variations")

urlpatterns = [
    path('', include(router.urls)),
]
