// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../components/Login.css";
import logo from "../assets/images/logo.png";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useUser();

    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            if (response.ok) {
                login({ username: data.username, role: data.role });
                navigate("/");
            } else {
                setError(data.message || "Credenciales inválidas");
            }
        } catch (err) {
            setError("Error al conectar con el servidor");
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleSubmit}>
                <img src={logo} alt="Logo Novamed" className="login-logo" />
                <h2>Iniciar Sesión</h2>
                {error && <p className="login-error">{error}</p>}
                <input
                    type="text"
                    name="username"
                    placeholder="Usuario"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
