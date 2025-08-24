import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/server.config.js";
import { error } from "console";

// Generate JWT Token
export async function generateToken(payload, expiresIn = "1h") {
  try {
    // check jwt secret exist
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // payload can include { id, email, role, etc. }
    
    const token=await jwt.sign(payload, JWT_SECRET, { expiresIn });
   
    return {error:'',token};

  } catch (error) {
console.error("Error generating token:", error.message);
    return {error};
  }
}


