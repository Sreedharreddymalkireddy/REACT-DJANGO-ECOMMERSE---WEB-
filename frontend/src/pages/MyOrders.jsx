import {
    useEffect,
    useState
} from "react";

import api from "../api/axios";


function MyOrders() {

    const [orders, setOrders] = useState([]);


    useEffect(() => {

        api.get("orders/my-orders/")
            .then(response => {

                setOrders(response.data);

            })
            .catch(error => {

                console.log(
                    error.response?.data
                );

            });

    }, []);


    return (

        <main className="orders-page">

            <div className="page-heading">

                <p className="section-label">
                    ACCOUNT
                </p>

                <h1>
                    My Orders
                </h1>

            </div>


            {orders.length === 0 ? (

                <div className="empty-page small">

                    <h2>
                        No orders yet
                    </h2>

                    <p>
                        Your placed orders will appear here.
                    </p>

                </div>

            ) : (

                <div className="orders-list">

                    {orders.map(order => (

                        <div
                            key={order.id}
                            className="order-card"
                        >

                            <div className="order-header">

                                <div>

                                    <h2>
                                        Order #{order.id}
                                    </h2>

                                    <p>
                                        {new Date(
                                            order.created_at
                                        ).toLocaleString()}
                                    </p>

                                </div>


                                <span className="status">
                                    {order.status}
                                </span>

                            </div>


                            <div className="order-products">

                                {order.items.map(item => (

                                    <div
                                        key={item.id}
                                        className="order-product"
                                    >

                                        <div>

                                            <strong>
                                                {item.product_name}
                                            </strong>

                                            <p>
                                                Quantity:
                                                {" "}
                                                {item.quantity}
                                            </p>

                                        </div>


                                        <strong>
                                            ₹{item.price}
                                        </strong>

                                    </div>

                                ))}

                            </div>


                            <div className="order-total">

                                Total:
                                {" "}
                                ₹{order.total_price}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </main>
    );
}


export default MyOrders;