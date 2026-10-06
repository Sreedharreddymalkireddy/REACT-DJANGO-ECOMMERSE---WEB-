import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


function ProductCard({ product }) {

    const { addToCart } = useCart();


    function handleAddToCart() {

        addToCart(product);

        alert("Product added to cart");

    }


    return (

        <div className="product-card">

            <Link
                to={`/product/${product.id}`}
                className="product-image-link"
            >

                <img
                    src={product.image}
                    alt={product.name}
                />

            </Link>


            <div className="product-info">

                <p className="product-category">
                    {product.category}
                </p>


                <Link
                    to={`/product/${product.id}`}
                    className="product-name"
                >
                    {product.name}
                </Link>


                <p className="product-description">
                    {product.description}
                </p>


                <div className="product-bottom">

                    <h3>
                        ₹{product.price}
                    </h3>

                    <span>
                        {product.stock > 0
                            ? "In Stock"
                            : "Out of Stock"
                        }
                    </span>

                </div>


                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="add-cart-button"
                >
                    {product.stock > 0
                        ? "Add to Cart"
                        : "Out of Stock"
                    }
                </button>

            </div>

        </div>
    );
}


export default ProductCard;