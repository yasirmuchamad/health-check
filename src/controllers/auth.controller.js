import { prisma } from "../prisma.js";
import { generateToken, hashPassword, signin } from "../services/auth.service.js";


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

        if (!email || !password){
            return res.status(404).json({ message:"Email and password is reqired"});
        }

        const isValid = await signin(email, password);

        res.json({
            message:"Login Successful",
            isValid
        })

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