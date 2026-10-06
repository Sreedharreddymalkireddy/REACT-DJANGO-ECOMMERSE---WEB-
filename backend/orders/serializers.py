from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    class Meta:

        model = OrderItem

        fields = [
            'id',
            'product',
            'product_name',
            'quantity',
            'price'
        ]


class OrderSerializer(serializers.ModelSerializer):

    items = serializers.SerializerMethodField()

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    class Meta:

        model = Order

        fields = [
            'id',
            'username',
            'total_price',
            'status',
            'created_at',
            'items'
        ]

    def get_items(self, obj):

        items = OrderItem.objects.filter(
            order=obj
        )

        return OrderItemSerializer(
            items,
            many=True
        ).data