import { useCart } from "../context/CartContext";

import {
    useNavigate
} from "react-router-dom";

import api from "../api/axios";


function Checkout() {

    const {
        cart,
        clearCart
    } = useCart();


    const navigate = useNavigate();


    let total = 0;


    cart.forEach(product => {

        total +=
            Number(product.price) *
            product.quantity;

    });


    function placeOrder() {

        if (cart.length === 0) {

            alert("Your cart is empty");

            return;

        }


        api.post(
            "orders/place/",
            {
                cart: cart
            }
        )
        .then(() => {

            alert(
                "Order placed successfully!"
            );

            clearCart();

            navigate("/my-orders");

        })
        .catch(error => {

            console.log(
                error.response?.data
            );


            if (
                error.response?.status === 401
            ) {

                alert(
                    "Please login before placing an order"
                );

                navigate("/login");

            } else {

                alert(
                    error.response?.data?.message ||
                    "Something went wrong"
                );

            }

        });

    }


    return (

        <main className="checkout-page">

            <div className="page-heading">

                <p className="section-label">
                    CHECKOUT
                </p>

                <h1>
                    Review Your Order
                </h1>

            </div>


            <div className="checkout-layout">

                <div className="checkout-products">

                    {cart.map(product => (

                        <div
                            key={product.id}
                            className="checkout-item"
                        >

                            <img
                                src={product.image}
                                alt={product.name}
                            />


                            <div>

                                <h3>
                                    {product.name}
                                </h3>

                                <p>
                                    Quantity:
                                    {" "}
                                    {product.quantity}
                                </p>

                                <strong>
                                    ₹{product.price}
                                </strong>

                            </div>

                        </div>

                    ))}

                </div>


                <div className="checkout-summary">

                    <h2>
                        Order Summary
                    </h2>


                    <div className="summary-row">

                        <span>
                            Subtotal
                        </span>

                        <span>
                            ₹{total}
                        </span>

                    </div>


                    <div className="summary-row">

                        <span>
                            Delivery
                        </span>

                        <span>
                            FREE
                        </span>

                    </div>


                    <div className="summary-row total-row">

                        <strong>
                            Total
                        </strong>

                        <strong>
                            ₹{total}
                        </strong>

                    </div>


                    <button
                        className="checkout-button"
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </main>
    );
}


export default Checkout;