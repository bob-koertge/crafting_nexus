from django.db.models.fields import CharField, SlugField
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Pattern, PatternTuturials, Publisher


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password':
                        {'write_only': True,
                         'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ('id', 'name', 'url')


class PatternTutorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatternTuturials
        fields = ('id', 'name', 'url')


class PatternSerializer(serializers.ModelSerializer):
    publisher = PublisherSerializer(read_only=False, many=True)
    user = UserSerializer(read_only=False, many=False)
    tuturials = PatternTutorialSerializer(read_only=False, many=True)
    pattern_categories = serializers.StringRelatedField(many=True)
    pattern_sizes = serializers.StringRelatedField(many=True)
    pattern_variations = serializers.StringRelatedField(many=True)

    class Meta:
        model = Pattern
        fields = ('id', 'name', 'description', 'user',
                  'publisher', 'pattern_categories', 'pattern_sizes', 
                  'pattern_variations', 'tuturials')
