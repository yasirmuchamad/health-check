import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";

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

export const signin = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: {email}
    });

    if (!user) {
        throw new Error("Invalid email or password");
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:"Id"}
    );
    return token;
}