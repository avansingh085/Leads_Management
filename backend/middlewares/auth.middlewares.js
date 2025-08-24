import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/server.config.js";

// Middleware to check JWT in cookies
export const verifyToken = (req, res, next) => {
  try {
    // get token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, msg: "No token provided" });
    }

    // verify token
    jwt.verify(token,JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, msg: "Invalid or expired token" });
      }

      // attach decoded data to request
      req.user = decoded;
      next();
    });
  } catch(error)
   {

    return res.status(500).json({ success: false, msg: "Auth middleware error", error: error.message });
  }
};
