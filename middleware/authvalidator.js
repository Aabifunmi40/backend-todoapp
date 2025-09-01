const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");

const authValidator = async (req, res, next) => {
  try {
    let reqHeader = req.headers.authorization;

    // No token
    if (!reqHeader || !reqHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract token
    let token = reqHeader.split(" ")[1];

    // Verify token using JWT secret from .env
    let userData = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in DB
    let user = await UserModel.findById(userData._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authValidator;
