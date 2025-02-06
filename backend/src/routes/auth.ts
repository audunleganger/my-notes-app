import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
    const { username, password } = req.body;
    console.log(`Received registration: ${username} ${password}`);
    res.sendStatus(200);
});

export default router;
