# Generated by Django 3.0.5 on 2021-09-26 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20210812_1609'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='seo_meta_description',
            field=models.TextField(max_length=280, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='seo_meta_title',
            field=models.CharField(default='<django.db.models.fields.CharField> - Buy Online in Nepal at Best Price', max_length=80, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='slug',
            field=models.SlugField(null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='weight',
            field=models.IntegerField(null=True),
        ),
    ]