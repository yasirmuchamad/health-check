import bcrypt from "bcryptjs";
import { prisma } from "../prisma.js";

export const getAllUsers = async() => {
    return prisma.user.findMany();
};

export const getUserById = async(id) => {
    return prisma.user.findUnique({
        where: { id }
    });
};

export const createUser = async(data) => {
    console.log("DATA MASUK SERVICE:", data);
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
        data : {
            name : data.name,
            role : data.role,
            email : data.email,
            password : hashedPassword
        }       
    });
};

export const updateUser = async(id, data) => {
    return prisma.user.create({
        data
    });
};

export const deleteUser = async (id) => {
    return prisma.user.delete({
        where:{ id },
    });
};

