import express from "express";
import authRouter from "./routes/auth";

const app = express();
const port = 5000;

app.use(express.json());
app.use("/api/auth", authRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
