import { useState } from "react";
import { Header } from "../components/Header";
const RegistrationForm = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            setError("success");
            console.log("Registration successful");
        } else {
            const errorData = await response.json();
            setError(errorData.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Register</button>
                    {error && <p>{error}</p>}
                </fieldset>
            </form>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    fetch("/api/auth/log-users", { method: "POST" });
                }}
            >
                Log users at server
            </button>
        </>
    );
};

const RegisterPage = () => {
    return (
        <>
            <Header />
            <h1>Register</h1>
            <RegistrationForm />
        </>
    );
};

export default RegisterPage;
