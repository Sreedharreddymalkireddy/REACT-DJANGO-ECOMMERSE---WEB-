import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Navbar from "./components/Navbar";

import AdminRoute from "./components/AdminRoute";

import AdminLayout from "./components/AdminLayout";


import ProductList from "./components/ProductList";

import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";

import Register from "./pages/Register";

import Login from "./pages/Login";

import Profile from "./pages/Profile";

import Checkout from "./pages/Checkout";

import MyOrders from "./pages/MyOrders";


import AdminDashboard from "./pages/AdminDashboard";

import AdminProducts from "./pages/AdminProducts";

import AdminOrders from "./pages/AdminOrders";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* CUSTOMER WEBSITE */}

                <Route
                    path="/*"
                    element={

                        <>

                            <Navbar />

                            <Routes>

                                <Route
                                    path="/"
                                    element={<ProductList />}
                                />

                                <Route
                                    path="/product/:id"
                                    element={<ProductDetails />}
                                />

                                <Route
                                    path="/cart"
                                    element={<Cart />}
                                />

                                <Route
                                    path="/checkout"
                                    element={<Checkout />}
                                />

                                <Route
                                    path="/register"
                                    element={<Register />}
                                />

                                <Route
                                    path="/login"
                                    element={<Login />}
                                />

                                <Route
                                    path="/profile"
                                    element={<Profile />}
                                />

                                <Route
                                    path="/my-orders"
                                    element={<MyOrders />}
                                />

                            </Routes>

                        </>

                    }
                />


                {/* ADMIN */}

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>

                            <AdminLayout>

                                <AdminDashboard />

                            </AdminLayout>

                        </AdminRoute>
                    }
                />


                <Route
                    path="/admin/products"
                    element={
                        <AdminRoute>

                            <AdminLayout>

                                <AdminProducts />

                            </AdminLayout>

                        </AdminRoute>
                    }
                />


                <Route
                    path="/admin/orders"
                    element={
                        <AdminRoute>

                            <AdminLayout>

                                <AdminOrders />

                            </AdminLayout>

                        </AdminRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;