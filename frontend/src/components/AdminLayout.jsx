import { Link, useNavigate } from "react-router-dom";


function AdminLayout({ children }) {

    const navigate = useNavigate();


    function logout() {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("is_admin");
        localStorage.removeItem("username");

        navigate("/login");
    }


    return (

        <div className="admin-layout">

            <aside className="admin-sidebar">

                <Link
                    to="/admin"
                    className="admin-logo"
                >
                    MyShop
                    <span>ADMIN</span>
                </Link>


                <div className="admin-menu">

                    <Link to="/admin">
                        Dashboard
                    </Link>

                    <Link to="/admin/products">
                        Products
                    </Link>

                    <Link to="/admin/orders">
                        Orders
                    </Link>

                </div>


                <div className="admin-sidebar-bottom">

                    <Link to="/">
                        ← View Store
                    </Link>

                    <button onClick={logout}>
                        Logout
                    </button>

                </div>

            </aside>


            <section className="admin-content">

                {children}

            </section>

        </div>
    );
}


export default AdminLayout;