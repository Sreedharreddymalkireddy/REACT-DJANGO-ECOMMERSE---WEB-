from django.contrib.auth import authenticate

from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer


@api_view(['POST'])
def register(request):

    serializer = RegisterSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message": "User registered successfully"
        })

    return Response(
        serializer.errors,
        status=400
    )


@api_view(['POST'])
def login(request):

    username = request.data.get('username')

    password = request.data.get('password')


    user = authenticate(
        username=username,
        password=password
    )


    if user is not None:

        refresh = RefreshToken.for_user(user)


        return Response({

            "message": "Login successful",

            "refresh": str(refresh),

            "access": str(refresh.access_token),

            "username": user.username,

            "is_admin": user.is_staff

        })


    return Response({

        "message": "Invalid username or password"

    }, status=401)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):

    return Response({

        "username": request.user.username,

        "email": request.user.email,

        "is_admin": request.user.is_staff

    })