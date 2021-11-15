from enum import unique
from django.db import models
from django.contrib.auth.models import User


class PatternVariations(models.Model):
    pattern_variation = models.CharField(max_length=80)

    class Meta:
        verbose_name = ("Pattern Variation")
        verbose_name_plural = ("Pattern Variations")

    def __str__(self):
        return self.pattern_variation


class PatternCategory(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = ("Pattern Category")
        verbose_name_plural = ("Pattern Categories")

    def __str__(self):
        return self.name


class PatternSizes(models.Model):
    SIZE_TYPES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('U', 'Unisex'),
        ('C', 'Child'),
        ('I', 'Infant'),
        ('O', 'Other'),
    ]
    size_name = models.CharField(max_length=50)
    size_abbr = models.CharField(max_length=3)
    size_type = models.CharField(max_length=1, choices=SIZE_TYPES)

    class Meta:
        verbose_name = ("Pattern Size")
        verbose_name_plural = ("Pattern Sizes")

    def __str__(self):
        return f"{self.size_name}"


class Pattern(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=2000)
    pattern_categories = models.ManyToManyField(
        PatternCategory, blank=True, related_name='categories')
    pattern_sizes = models.ManyToManyField(PatternSizes, blank=True)
    pattern_variations = models.ManyToManyField(PatternVariations, blank=True)

    class Meta:
        unique_together = (('user', 'name'),)
        index_together = (('user', 'name'),)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pattern = models.ForeignKey(
        Pattern, on_delete=models.CASCADE, related_name='publisher')
    name = models.CharField(max_length=50)
    url = models.CharField(max_length=200)

    class Meta:
        unique_together = (('user', 'name'),)
        index_together = (('user', 'name'),)

    def __str__(self):
        return self.name


class PatternTuturials(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    url = models.URLField()
    pattern = models.ForeignKey(
        Pattern, on_delete=models.CASCADE, related_name='tuturials')

    class Meta:
        unique_together = (('user', 'name'),)
        index_together = (('user', 'name'),)
        verbose_name = ("Pattern Tutorial")
        verbose_name_plural = ("Pattern Tutorials")

    def __str__(self):
        return self.name
