from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from products.models import Product

from .models import Order, OrderItem
from .serializers import OrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):

    cart = request.data.get('cart')

    if not cart:
        return Response({
            "message": "Cart is empty"
        }, status=400)

    total_price = 0

    for item in cart:

        product = Product.objects.get(
            id=item['id']
        )

        quantity = item['quantity']

        if quantity > product.stock:
            return Response({
                "message": f"Not enough stock for {product.name}"
            }, status=400)

        total_price += product.price * quantity

    order = Order.objects.create(
        user=request.user,
        total_price=total_price
    )

    for item in cart:

        product = Product.objects.get(
            id=item['id']
        )

        quantity = item['quantity']

        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            price=product.price
        )

        product.stock = product.stock - quantity
        product.save()

    serializer = OrderSerializer(order)

    return Response({
        "message": "Order placed successfully",
        "order": serializer.data
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):

    orders = Order.objects.filter(
        user=request.user
    ).order_by('-created_at')

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_orders(request):

    orders = Order.objects.all().order_by('-created_at')

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_order_status(request, id):

    order = Order.objects.get(id=id)

    status = request.data.get('status')

    order.status = status

    order.save()

    return Response({
        "message": "Order status updated",
        "status": order.status
    })