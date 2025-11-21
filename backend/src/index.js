import express from "express";
import "dotenv/config";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import { connectDB } from "./lib/db.js";
import authRoutes from "../routes/authRoutes.js";
import resumeRoutes from '../routes/resumeRoutes.js'


const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(helmet());
app.use(cors());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});