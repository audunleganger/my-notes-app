import React, { useState } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const LoginForm = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            const data = await response.json();
            setUser(data.username);
            console.log("Login successful");
            navigate("/");
        } else {
            const errorData = await response.json();
            setError(errorData.message);
        }
    };
    return (
        <>
            <form>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        onChange={handleChange}
                    />
                    <button type="submit" onClick={handleSubmit}>
                        Login
                    </button>
                </fieldset>
            </form>
            <p>{error}</p>
        </>
    );
};
export const LoginPage = () => {
    return (
        <>
            <Header />
            <LoginForm />
        </>
    );
};

export default LoginPage;
