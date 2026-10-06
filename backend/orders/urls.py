from django.urls import path

from .views import (
    place_order,
    my_orders,
    all_orders,
    update_order_status
)


urlpatterns = [

    path(
        'place/',
        place_order
    ),

    path(
        'my-orders/',
        my_orders
    ),

    path(
        'all/',
        all_orders
    ),

    path(
        '<int:id>/status/',
        update_order_status
    ),

]