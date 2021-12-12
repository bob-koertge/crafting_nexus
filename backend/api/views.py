from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import MethodNotAllowed

from django.contrib.auth.models import User
from .models import Pattern, PatternCategory, Publisher, PatternTuturials, PatternSizes
from .serializers import PatternSizesSerializer, PatternCategoriesSerializer, PatternSerializer, PublisherSerializer, UserSerializer, PatternTutorialSerializer

class PatternSizeViewSet(viewsets.ModelViewSet):
    serializer_class = PatternSizesSerializer
    queryset = PatternSizes.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

class PatternCategoriesViewSet(viewsets.ModelViewSet):
    serializer_class = PatternCategoriesSerializer
    queryset = PatternCategory.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    
class PatternViewSet(viewsets.ModelViewSet):
    serializer_class = PatternSerializer
    #queryset = Pattern.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Pattern.objects.filter(user=self.request.user)


class PublisherViewSet(viewsets.ModelViewSet):
    serializer_class = PublisherSerializer
    #queryset = Publisher.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Publisher.objects.filter(user=self.request.user)

class PatternTutorialViewSet(viewsets.ModelViewSet):
    serializer_class = PatternTutorialSerializer
    #queryset = Publisher.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return PatternTuturials.objects.filter(user=self.request.user)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        raise MethodNotAllowed("GET")
