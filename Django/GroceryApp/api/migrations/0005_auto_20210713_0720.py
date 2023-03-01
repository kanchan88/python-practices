# Generated by Django 3.0.5 on 2021-07-13 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210712_0950'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='images',
        ),
        migrations.AddField(
            model_name='product',
            name='prod_pics',
            field=models.ManyToManyField(to='api.Images', verbose_name='prod_pics'),
        ),
    ]