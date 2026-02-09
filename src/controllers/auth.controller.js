import { prisma } from "../prisma.js";

import { comparePassword, generateToken, hashPassword } from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;
        const hashed = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                role,
                password:hashed,
            },
        });
        res.status(201).json({
            message:"User registered",
            data:{
                id:user.id,
                name:user.name,
                role:user.role,
            },
        });
    } catch(error){
        res.status(500).json({message:error.message});
    }
};


export const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({
            where: {email},            
        });

        if (!user){
            return res.status(404).json({ message:"User not found"});
        }

        const isValid = await comparePassword(password, user.password);

        if (!isValid){
            return res.status(401).json({message:"Invalid password"});
        }

        const token = generateToken({ 
            id:user.id, 
            role:user.role,
        });

        res.json({ 
            token,
            user:{
                id:user.id,
                name:user.name,
                role:user.role,
            },
        });
    }catch (error){
        res.status(500).json({message:error.message})
    }
};