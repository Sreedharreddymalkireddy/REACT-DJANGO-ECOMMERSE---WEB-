import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import api from "../api/axios";


function AdminDashboard() {

    const [products, setProducts] = useState([]);

    const [orders, setOrders] = useState([]);


    useEffect(() => {

        api.get("products/")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            });


        api.get("orders/all/")
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);


    let totalSales = 0;


    orders.forEach(order => {

        totalSales += Number(order.total_price);

    });


    return (

        <div>

            <div className="admin-topbar">

                <div>

                    <p className="admin-label">
                        OVERVIEW
                    </p>

                    <h1>
                        Dashboard
                    </h1>

                </div>


                <Link
                    to="/admin/products"
                    className="admin-primary-button"
                >
                    + Add Product
                </Link>

            </div>


            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <p>
                        PRODUCTS
                    </p>

                    <h2>
                        {products.length}
                    </h2>

                    <span>
                        Total products
                    </span>

                </div>


                <div className="dashboard-card">

                    <p>
                        ORDERS
                    </p>

                    <h2>
                        {orders.length}
                    </h2>

                    <span>
                        Total orders
                    </span>

                </div>


                <div className="dashboard-card">

                    <p>
                        SALES
                    </p>

                    <h2>
                        ₹{totalSales.toLocaleString()}
                    </h2>

                    <span>
                        Order value
                    </span>

                </div>

            </div>


            <div className="admin-section">

                <div className="admin-section-heading">

                    <div>

                        <p className="admin-label">
                            RECENT ACTIVITY
                        </p>

                        <h2>
                            Recent Orders
                        </h2>

                    </div>


                    <Link to="/admin/orders">
                        View All
                    </Link>

                </div>


                {orders.length === 0 ? (

                    <div className="admin-empty">
                        No orders yet.
                    </div>

                ) : (

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>
                                        Order
                                    </th>

                                    <th>
                                        Customer
                                    </th>

                                    <th>
                                        Total
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {orders.slice(0, 5).map(order => (

                                    <tr key={order.id}>

                                        <td>
                                            #{order.id}
                                        </td>

                                        <td>
                                            {order.username}
                                        </td>

                                        <td>
                                            ₹{order.total_price}
                                        </td>

                                        <td>

                                            <span className="status">
                                                {order.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}


export default AdminDashboard;