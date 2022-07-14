import axios from "axios";
import React, { useState } from "react";
import "./home_page.css";
import useAuth from "../../Components/hooks/useAuth";

import FetchUrl from "../../url";
import { useNavigate } from "react-router-dom";
const url = FetchUrl.fetchUrl;
const frontEndUrl = FetchUrl.frontendLink;

function HomePage() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        full_name: "",
        password: "",
    });

    const handleChange = (e) => {
        setError(false)
        let input = e.target.name;
        let value = e.target.value;
        setData({ ...data, [input]: value });
    };

    const login = async (e) => {
        setError(false)
        e.preventDefault();

        let admin = await axios.get(`${url}/api/admin`).then(response => {
            return response.data.data.find(admin => admin.full_name === data.full_name);
        })

        let response = axios
            .post(`${url}/api/admin/login/login`, data)
            .then((response) => {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                navigate('/home-page', { state: { id: admin.id } })
                window.location.reload();
            })
            .catch((error) => {
                console.log(error.response.data);
                setError(true);
            });
    };
    return (
        <div id="home_page">
            <div className="login_wrapper">
                <form className="container">
                    <div className="home-titles">
                        <h1 className="company-name" style={{ textAlign: "center" }}>
                            ERP Company
                        </h1>
                        <h2 className="login-vvv" style={{ marginTop: 20 }}>
                            Login
                        </h2>
                    </div>
                    <div className="home-inputs">
                        <input
                            autoComplete="off"
                            type="text"
                            placeholder="Username"
                            name="full_name"
                            required
                            onChange={handleChange}
                        />
                        <input
                            minLength="8"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p id="login-error">Incorrect username or password! Please try again</p>}
                    <button type="submit" className="btn" onClick={login}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default HomePage;
