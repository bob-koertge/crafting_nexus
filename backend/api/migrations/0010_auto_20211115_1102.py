# Generated by Django 3.2.9 on 2021-11-15 11:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0009_alter_patterntuturials_pattern'),
    ]

    operations = [
        migrations.AddField(
            model_name='patterntuturials',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='auth.user'),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='patterntuturials',
            unique_together={('user', 'name')},
        ),
        migrations.AlterIndexTogether(
            name='patterntuturials',
            index_together={('user', 'name')},
        ),
    ]
