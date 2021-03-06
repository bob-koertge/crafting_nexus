# Generated by Django 3.2.9 on 2021-11-15 10:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20211115_1031'),
    ]

    operations = [
        migrations.CreateModel(
            name='PatternVariations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pattern_variation', models.CharField(max_length=80)),
            ],
            options={
                'verbose_name': 'Pattern Variation',
                'verbose_name_plural': 'Pattern Variations',
            },
        ),
        migrations.AddField(
            model_name='pattern',
            name='pattern_variations',
            field=models.ManyToManyField(blank=True, to='api.PatternVariations'),
        ),
    ]
