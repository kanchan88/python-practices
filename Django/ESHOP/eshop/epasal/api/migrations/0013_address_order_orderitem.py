# Generated by Django 3.2.15 on 2022-09-17 08:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0012_alter_item_item_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address_1', models.CharField(max_length=50)),
                ('address_2', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('state', models.CharField(max_length=50)),
                ('postcode', models.CharField(max_length=10)),
                ('country', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField()),
                ('order_note', models.TextField()),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.item', verbose_name='item')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_method', models.CharField(max_length=10)),
                ('order_status', models.CharField(max_length=10)),
                ('total_payment', models.IntegerField()),
                ('delivery_date', models.CharField(max_length=15)),
                ('billing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='billing', to='api.address')),
                ('items', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.orderitem', verbose_name='orderitem')),
                ('shipping', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shipping', to='api.address')),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
