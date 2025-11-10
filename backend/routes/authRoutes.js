import express from "express";
import User from "../src/models/User.js";
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Registration logic goes here
        if(!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        if(username.length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters long" });
        }

        // Check if user already exists 
        const existingEmail = await User.findOne({ email });
        if(existingEmail) return res.status(400).json({ message: "Email already exists" });

        const existingUsername = await User.findOne({ username });
        if(existingUsername) return res.status(400).json({ message: "Username already exists" });

        // Get random avatar
        const profileImage = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${username}`;

        // Create new user
        const user = new User({ 
            username, 
            email, 
            password,
            profileImage
        });

        await user.save();

    } catch (error) {
        
    }
});

router.post("/login", async (req, res) => {
    res.send("login");
});

export default router;