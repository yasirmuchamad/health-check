import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

export const hashPassword = (password) => {
   return bcrypt.hash(password, 10);
};

export const comparePassword = (password, hash) => {
    return bcrypt.compare (password, hash);
};

export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET, {expiresIn:"1h"});
};