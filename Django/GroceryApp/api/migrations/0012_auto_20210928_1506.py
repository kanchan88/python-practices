# Generated by Django 3.0.5 on 2021-09-28 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20210928_0225'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='images',
            field=models.ManyToManyField(null=True, to='api.Images'),
        ),
    ]