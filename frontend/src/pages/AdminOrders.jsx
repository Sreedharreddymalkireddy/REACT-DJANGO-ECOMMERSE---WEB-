import {
    useEffect,
    useState
} from "react";

import api from "../api/axios";


function AdminOrders() {

    const [orders, setOrders] = useState([]);


    function getOrders() {

        api.get("orders/all/")
            .then(response => {

                setOrders(response.data);

            })
            .catch(error => {

                console.log(error);

            });

    }


    useEffect(() => {

        getOrders();

    }, []);


    function updateStatus(id, status) {

        api.put(
            `orders/${id}/status/`,
            {
                status: status
            }
        )
        .then(() => {

            getOrders();

        })
        .catch(error => {

            console.log(
                error.response?.data
            );

        });

    }


    return (

        <div>

            <div className="admin-topbar">

                <div>

                    <p className="admin-label">
                        SALES
                    </p>

                    <h1>
                        Orders
                    </h1>

                </div>

            </div>


            <div className="admin-section">

                <div className="admin-section-heading">

                    <div>

                        <p className="admin-label">
                            ORDER MANAGEMENT
                        </p>

                        <h2>
                            All Orders
                        </h2>

                    </div>

                    <span>
                        {orders.length} orders
                    </span>

                </div>


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
                                    Products
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {orders.map(order => (

                                <tr key={order.id}>

                                    <td>
                                        <strong>
                                            #{order.id}
                                        </strong>
                                    </td>


                                    <td>
                                        {order.username}
                                    </td>


                                    <td>
                                        ₹{order.total_price}
                                    </td>


                                    <td>
                                        {order.items.length}
                                    </td>


                                    <td>

                                        <select
                                            className="status-select"
                                            value={order.status}
                                            onChange={(e) =>
                                                updateStatus(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="Placed">
                                                Placed
                                            </option>

                                            <option value="Processing">
                                                Processing
                                            </option>

                                            <option value="Shipped">
                                                Shipped
                                            </option>

                                            <option value="Delivered">
                                                Delivered
                                            </option>

                                            <option value="Cancelled">
                                                Cancelled
                                            </option>

                                        </select>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}


export default AdminOrders;