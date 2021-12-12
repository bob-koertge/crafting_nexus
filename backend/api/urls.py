from django.urls import path
from django.conf.urls import include

from rest_framework import routers
from .views import PatternCategoriesViewSet, PatternViewSet, PublisherViewSet, UserViewSet, PatternTutorialViewSet, PatternSizeViewSet

router = routers.DefaultRouter()
router.register('registration', UserViewSet, basename="User")
router.register('patterns', PatternViewSet, basename='Pattern')
router.register('pattern/publishers', PublisherViewSet, basename='Publisher')
router.register('pattern/variations', PatternTutorialViewSet, basename="Variations")
router.register('pattern/categories', PatternCategoriesViewSet, basename="Categories")
router.register('pattern/sizes', PatternSizeViewSet, basename="Sizes")


urlpatterns = [
    path('', include(router.urls)),
]
