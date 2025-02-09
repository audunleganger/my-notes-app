import { Router } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = Router();

const users: { id: number; username: string; password: string }[] = [];
let nextId = 1;

router.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "Username taken" });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: "Password too short" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Store the user
    const user = { id: nextId++, username, password: hashedPassword };
    users.push(user);

    res.status(201).json({
        message: `User ${username} created on the server.`,
    });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Find the User
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    // Check the password hash
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }

    // Generate a JWT
    const token = jwt.sign({ id: user.id }, "jwt_secret", { expiresIn: "5m" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });

    // Send the JWT
    res.status(200).json({ message: "Login successful" });
});

router.post("/log-users", (req, res) => {
    console.log(users);
});

router.get("/check", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const payload = jwt.verify(token, "jwt_secret") as JwtPayload;
        console.log("paylaod:", payload);
        const user = users.find((user) => user.id === payload.id);
        if (!user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        res.status(200).json({ username: user.username });
    } catch (error) {
        return res.status(401).json({ message: "Not authenticated" });
    }
});

export default router;
