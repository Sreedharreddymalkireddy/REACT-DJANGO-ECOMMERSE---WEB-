import axios from "axios";

import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";


function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    function loginUser(e) {

        e.preventDefault();


        axios.post(
            "http://127.0.0.1:8000/api/accounts/login/",
            {
                username: username,
                password: password
            }
        )
        .then(response => {

            localStorage.setItem(
                "access",
                response.data.access
            );


            localStorage.setItem(
                "refresh",
                response.data.refresh
            );


            localStorage.setItem(
                "is_admin",
                response.data.is_admin
            );


            localStorage.setItem(
                "username",
                response.data.username
            );


            alert("Login successful");


            navigate("/");

        })
        .catch(error => {

            console.log(
                error.response?.data
            );

            alert(
                "Invalid username or password"
            );

        });

    }


    return (

        <main className="auth-page">

            <div className="auth-box">

                <p className="section-label">
                    WELCOME BACK
                </p>

                <h1>
                    Login
                </h1>

                <p className="auth-description">
                    Sign in to continue shopping.
                </p>


                <form onSubmit={loginUser}>

                    <label>
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    <button type="submit">
                        Login
                    </button>

                </form>


                <p className="auth-bottom">

                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </main>
    );
}


export default Login;