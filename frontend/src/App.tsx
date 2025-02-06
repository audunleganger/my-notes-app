import { useState } from "react";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });

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
            console.log("Registration successful");
        } else {
            console.error("Registration failed...");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
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
                <button type="submit">Submit</button>
            </fieldset>
        </form>
    );
};
const App = () => {
    return (
        <>
            <RegistrationForm />
        </>
    );
};

export default App;
