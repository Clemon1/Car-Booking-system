import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const secretJwtKey = process.env.JWT_SECRET;

// Generate JWT Tokens
export const createToken = async ({ user, role }) => {
  const token = jwt.sign({ user, role }, secretJwtKey, {
    expiresIn: "24hr",
  });
  return token;
};
// Verify Tokens
export const verifyToken = (req, res, next) => {
  const token =
    req.cookies.carphanClientToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No token found" });
  }

  jwt.verify(token, secretJwtKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token, Unauthorized" });
    }
    req.user = decoded.user;
    req.role = decoded.role;

    next();
  });
};

// Checking if its an admin making the request
export const isAdmin = (req, res, next) => {
  if (req.role != "admin") {
    return res
      .status(401)
      .json({ message: "You are not authorized to view the data" });
  }
  next();
};

// Checks if its a User making the request
export const isUser = (req, res, next) => {
  if (req.role !== "user") {
    return res.status(401).json({ message: "Not authorized" });
  }
  next();
};
