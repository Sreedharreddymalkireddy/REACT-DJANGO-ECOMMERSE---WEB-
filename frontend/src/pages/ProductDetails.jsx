import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";


function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);


    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/api/products/${id}/`
        )
        .then(response => {

            setProduct(response.data);

        })
        .catch(error => {

            console.log(error);

        });

    }, [id]);


    if (!product) {

        return (
            <div className="loading">
                Loading product...
            </div>
        );

    }


    function handleAddToCart() {

        addToCart(product);

        alert("Product added to cart");

    }


    return (

        <main className="details-page">

            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>


            <div className="details-container">

                <div className="details-image">

                    <img
                        src={product.image}
                        alt={product.name}
                    />

                </div>


                <div className="details-info">

                    <p className="product-category">
                        {product.category}
                    </p>


                    <h1>
                        {product.name}
                    </h1>


                    <p className="details-description">
                        {product.description}
                    </p>


                    <h2 className="details-price">
                        ₹{product.price}
                    </h2>


                    <p className="stock-text">

                        {product.stock > 0
                            ? `${product.stock} items available`
                            : "Currently unavailable"
                        }

                    </p>


                    <button
                        className="large-cart-button"
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                    >
                        Add to Cart
                    </button>


                    <div className="product-features">

                        <div>
                            <strong>✓</strong>
                            Quality Products
                        </div>

                        <div>
                            <strong>✓</strong>
                            Secure Shopping
                        </div>

                        <div>
                            <strong>✓</strong>
                            Easy Returns
                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}


export default ProductDetails;