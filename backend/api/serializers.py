from django.db.models.fields import CharField, SlugField
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Pattern, PatternCategory, PatternSizes, PatternTuturials, PatternVariations, Publisher


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


class PatternVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatternVariations
        fields = ('id', 'pattern_variation', )


class PatternTutorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatternTuturials
        fields = ('id', 'name', 'url')


class PatternCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatternCategory
        fields = ('id', 'name')


class PatternSizesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatternSizes
        fields = ('id', 'size_name', 'size_abbr', 'size_type')


class PatternSerializer(serializers.ModelSerializer):
    publisher = PublisherSerializer(
        read_only=False, many=True, required=False, allow_null=True)
   #user = UserSerializer(read_only=False, many=False, required=False, allow_null=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    tuturials = PatternTutorialSerializer(
        read_only=False, many=True, required=False, allow_null=True)
    pattern_categories = PatternCategoriesSerializer(
        read_only=False, many=True, required=False, allow_null=True)
    pattern_sizes = PatternSizesSerializer(
        read_only=False, many=True, required=False, allow_null=True)
    pattern_variations = PatternVariationSerializer(
        many=True, required=False, allow_null=True)

    class Meta:
        model = Pattern
        fields = ('id', 'name', 'description', 'user',
                  'publisher', 'pattern_categories', 'pattern_sizes',
                  'pattern_variations', 'tuturials', 'rating')
