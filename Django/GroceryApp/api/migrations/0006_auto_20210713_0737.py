# Generated by Django 3.0.5 on 2021-07-13 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210713_0720'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='prod_pics',
        ),
        migrations.AddField(
            model_name='product',
            name='images',
            field=models.ManyToManyField(to='api.Images'),
        ),
    ]