import express from "express";
import multer from "multer";
import { uploadResume } from "../src/controllers/resumeController.js";
import authenticateJWT from "../middleware/auth.middleware.js";

const router = express.Router();

// store file in RAM
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload",authenticateJWT, upload.single("resume"), uploadResume);

export default router;
