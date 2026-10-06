import {
    useEffect,
    useState
} from "react";

import api from "../api/axios";


function Profile() {

    const [user, setUser] = useState(null);


    useEffect(() => {

        api.get("accounts/profile/")
            .then(response => {

                setUser(response.data);

            })
            .catch(error => {

                console.log(
                    error.response?.data
                );

            });

    }, []);


    if (!user) {

        return (
            <div className="loading">
                Loading...
            </div>
        );

    }


    return (

        <main className="profile-page">

            <div className="profile-card">

                <div className="profile-avatar">
                    {user.username[0].toUpperCase()}
                </div>

                <p className="section-label">
                    MY ACCOUNT
                </p>

                <h1>
                    {user.username}
                </h1>


                <div className="profile-info">

                    <div>

                        <span>
                            Username
                        </span>

                        <strong>
                            {user.username}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Email
                        </span>

                        <strong>
                            {user.email}
                        </strong>

                    </div>

                </div>

            </div>

        </main>
    );
}


export default Profile;