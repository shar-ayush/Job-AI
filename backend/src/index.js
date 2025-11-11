import express from "express";
import "dotenv/config";
//cors package to handle Cross-Origin Resource Sharing
import cors from "cors";

import authRoutes from "../routes/authRoutes.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});