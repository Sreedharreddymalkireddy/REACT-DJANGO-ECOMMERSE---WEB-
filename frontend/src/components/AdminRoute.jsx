import { Navigate } from "react-router-dom";


function AdminRoute({ children }) {

    const token =
        localStorage.getItem("access");


    const isAdmin =
        localStorage.getItem("is_admin") === "true";


    if (!token) {

        return (
            <Navigate to="/login" />
        );

    }


    if (!isAdmin) {

        return (
            <Navigate to="/" />
        );

    }


    return children;
}


export default AdminRoute;