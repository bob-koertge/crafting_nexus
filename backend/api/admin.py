from django.contrib import admin
from .models import Pattern, Publisher, PatternCategory, PatternSizes, PatternVariations, PatternTuturials

admin.site.register(Pattern)
admin.site.register(Publisher)
admin.site.register(PatternCategory)
admin.site.register(PatternSizes)
admin.site.register(PatternVariations)
admin.site.register(PatternTuturials)