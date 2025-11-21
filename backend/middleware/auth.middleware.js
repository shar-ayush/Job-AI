import jwt from "jsonwebtoken";
import User from "../src/models/User.js";

const authenticateJWT = async (req, res, next) => {
  try {
    // get the token from the request headers
    // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided, authorization denied" });

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find the user by id
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found, authorization denied" });

    req.user = user; // attach user to request object
    next(); // proceed to the next middleware or route handler

  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Token is not valid" }); 
  }
};

export default authenticateJWT;


