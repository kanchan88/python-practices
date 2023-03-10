# Generated by Django 3.0.5 on 2021-07-06 03:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address_1', models.CharField(max_length=50)),
                ('address_2', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('state', models.CharField(max_length=50)),
                ('postcode', models.CharField(max_length=10)),
                ('country', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(max_length=15)),
                ('date_of_birth', models.DateField()),
                ('address', models.ManyToManyField(to='api.Address', verbose_name='Billing')),
                ('custom_user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='customer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('product_detail', models.TextField()),
                ('weight', models.IntegerField()),
                ('slug', models.SlugField()),
                ('marked_price', models.FloatField()),
                ('price', models.FloatField()),
                ('seo_meta_title', models.CharField(max_length=80)),
                ('seo_meta_description', models.TextField(max_length=280)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.CharField(choices=[('1', 'Poor'), ('2', 'Below Average'), ('3', 'Average'), ('4', 'Good'), ('5', 'Amazing')], max_length=15, null=True)),
                ('content', models.TextField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', related_query_name='comment', to='api.Product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', related_query_name='comment', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1, null=True)),
                ('prod', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='item', to='api.Product')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('order_number', models.AutoField(primary_key=True, serialize=False)),
                ('delivery_date', models.DateTimeField()),
                ('price', models.FloatField()),
                ('payment_method', models.CharField(choices=[('COD', 'Cash on Delivery'), ('BANK', 'Bank Transfer'), ('WALLET', 'Wallet Transfer')], max_length=6)),
                ('delivery_status', models.CharField(choices=[('Placed', 'Placed'), ('Processing', 'Processing'), ('Delivered', 'Delivered'), ('Cancelled', 'Cancelled')], default='Placed', max_length=16)),
                ('items', models.ManyToManyField(to='api.OrderItem')),
                ('order_address', models.ManyToManyField(to='api.Address')),
                ('order_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Customer')),
            ],
            options={
                'ordering': ['order_number'],
            },
        ),
        migrations.CreateModel(
            name='Images',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='data/media/products')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='api.Product')),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('products', models.ManyToManyField(related_name='product', to='api.Product')),
            ],
        ),
    ]
