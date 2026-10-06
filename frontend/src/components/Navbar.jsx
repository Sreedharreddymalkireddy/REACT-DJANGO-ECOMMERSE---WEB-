import {
    Link,
    useNavigate
} from "react-router-dom";

import { useCart } from "../context/CartContext";


function Navbar() {

    const { cart } = useCart();

    const navigate = useNavigate();


    let totalItems = 0;


    cart.forEach(product => {

        totalItems += product.quantity;

    });


    const token =
        localStorage.getItem("access");


    const isAdmin =
        localStorage.getItem("is_admin") === "true";


    function logout() {

        localStorage.removeItem("access");

        localStorage.removeItem("refresh");

        localStorage.removeItem("is_admin");

        localStorage.removeItem("username");

        alert("Logged out");

        navigate("/login");

    }


    return (

        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >
                MyShop
            </Link>


            <div className="nav-links">

                <Link to="/">
                    Shop
                </Link>


                <Link to="/cart">
                    Cart
                    <span className="cart-count">
                        {totalItems}
                    </span>
                </Link>


                {token ? (

                    <>

                        <Link to="/profile">
                            Profile
                        </Link>


                        <Link to="/my-orders">
                            Orders
                        </Link>


                        {isAdmin && (

                            <Link to="/admin">
                                Admin
                            </Link>

                        )}


                        <button
                            className="nav-logout"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </>

                ) : (

                    <>

                        <Link to="/login">
                            Login
                        </Link>


                        <Link
                            to="/register"
                            className="nav-register"
                        >
                            Register
                        </Link>

                    </>

                )}

            </div>

        </nav>
    );
}


export default Navbar;