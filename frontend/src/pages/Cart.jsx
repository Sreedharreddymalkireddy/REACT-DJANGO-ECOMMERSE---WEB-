import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";


function Cart() {

    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useCart();


    const navigate = useNavigate();


    let total = 0;


    cart.forEach(product => {

        total +=
            Number(product.price) *
            product.quantity;

    });


    if (cart.length === 0) {

        return (

            <main className="empty-page">

                <div>

                    <div className="empty-icon">
                        🛒
                    </div>

                    <h1>
                        Your cart is empty
                    </h1>

                    <p>
                        Looks like you haven't added
                        anything yet.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                    >
                        Start Shopping
                    </button>

                </div>

            </main>
        );

    }


    return (

        <main className="cart-page">

            <div className="page-heading">

                <p className="section-label">
                    YOUR SHOPPING BAG
                </p>

                <h1>
                    Shopping Cart
                </h1>

            </div>


            <div className="cart-layout">

                <div className="cart-items">

                    {cart.map(product => (

                        <div
                            key={product.id}
                            className="cart-item"
                        >

                            <img
                                src={product.image}
                                alt={product.name}
                            />


                            <div className="cart-item-info">

                                <p className="product-category">
                                    {product.category}
                                </p>

                                <h2>
                                    {product.name}
                                </h2>

                                <p>
                                    ₹{product.price}
                                </p>


                                <div className="quantity">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(
                                                product.id
                                            )
                                        }
                                    >
                                        −
                                    </button>

                                    <span>
                                        {product.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(
                                                product.id
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                <button
                                    className="remove-button"
                                    onClick={() =>
                                        removeFromCart(
                                            product.id
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                <div className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>

                    <div className="summary-row">

                        <span>
                            Items
                        </span>

                        <span>
                            {cart.reduce(
                                (sum, item) =>
                                    sum + item.quantity,
                                0
                            )}
                        </span>

                    </div>


                    <div className="summary-row total-row">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹{total}
                        </strong>

                    </div>


                    <button
                        className="checkout-button"
                        onClick={() =>
                            navigate("/checkout")
                        }
                    >
                        Proceed to Checkout
                    </button>

                </div>

            </div>

        </main>
    );
}


export default Cart;