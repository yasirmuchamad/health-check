import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { userRoutes } from "./routes/user.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
// app.use(errorHandler);

app.get("/health", (req, res) => {
    res.json({ 
        status:"OK", 
        uptime:process.uptime(),
        timestamp:new Date(),
    });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(3000, () =>{
    console.log("Server running on http://localhost:3000");
});
