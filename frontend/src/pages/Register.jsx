import axios from "axios";

import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";


function Register() {

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    function registerUser(e) {

        e.preventDefault();


        axios.post(
            "http://127.0.0.1:8000/api/accounts/register/",
            {
                username,
                email,
                password
            }
        )
        .then(() => {

            alert(
                "Registration successful"
            );

            navigate("/login");

        })
        .catch(error => {

            console.log(
                error.response?.data
            );

            alert(
                "Registration failed"
            );

        });

    }


    return (

        <main className="auth-page">

            <div className="auth-box">

                <p className="section-label">
                    JOIN MYSHOP
                </p>

                <h1>
                    Create Account
                </h1>

                <p className="auth-description">
                    Create your account and start shopping.
                </p>


                <form onSubmit={registerUser}>

                    <label>
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Choose username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        required
                    />


                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    <button type="submit">
                        Create Account
                    </button>

                </form>


                <p className="auth-bottom">

                    Already have an account?
                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </main>
    );
}


export default Register;