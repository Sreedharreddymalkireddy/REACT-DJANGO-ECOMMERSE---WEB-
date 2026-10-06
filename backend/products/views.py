from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer

from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import permission_classes

@api_view(['GET'])
def get_products(request):

    products = Product.objects.all()

    serializer = ProductSerializer(
        products,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, id):

    product = get_object_or_404(
        Product,
        id=id
    )

    serializer = ProductSerializer(product)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):

    serializer = ProductSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=201
        )

    return Response(
        serializer.errors,
        status=400
    )


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, id):

    product = get_object_or_404(
        Product,
        id=id
    )

    serializer = ProductSerializer(
        product,
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )


@api_view(['DELETE'])
def delete_product(request, id):

    product = get_object_or_404(
        Product,
        id=id
    )

    product.delete()

    return Response({
        "message": "Product deleted successfully"
    })