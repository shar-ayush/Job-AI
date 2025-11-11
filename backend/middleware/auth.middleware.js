// create an inline middleware for authentication for protected routes

// Example usage: app.use('/protected-route', authMiddleware, protectedRouteHandler);

// const response =  await fetch('http://localhost:3000/api/auth/verify', {
//     method: 'POST',
//     body: JSON.stringify({
//         // You can add additional data here if needed
//     }),
//     headers: {
//         'Authorization': `Bearer ${token}`
//     }
// });

const protectRoute = async (req, res, next) => {
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

export default protectRoute;

// When we want to protect a route, we can use this middleware like so:
// router.get('/protected-route', protectRoute, (req, res) => {
//     res.json({ message: "This is a protected route", user: req.user });
// })
