import { Link } from "react-router-dom";
import { Header } from "../components/Header";
export const HomePage = () => {
    return (
        <>
            <Header />
            <h1>Home page</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default HomePage;
