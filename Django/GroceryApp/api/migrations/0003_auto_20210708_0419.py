# Generated by Django 3.0.5 on 2021-07-08 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210706_1605'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='seo_meta_title',
            field=models.CharField(default='{name} - Buy Online in Nepal at Best Price', max_length=80),
        ),
    ]
