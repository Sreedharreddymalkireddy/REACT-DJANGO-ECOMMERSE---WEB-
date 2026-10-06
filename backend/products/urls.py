from django.urls import path

from .views import (
    get_products,
    get_product,
    create_product,
    update_product,
    delete_product
)


urlpatterns = [

    path('', get_products),

    path('create/', create_product),

    path('<int:id>/', get_product),

    path('<int:id>/update/', update_product),

    path('<int:id>/delete/', delete_product),

]