import React from "react";
import { useAuth } from "../context/AuthContext";

export const Header: React.FC = () => {
    const { user } = useAuth();
    return (
        <>
            <h1>Hello {user ? user : "guest"}</h1>
        </>
    );
};
