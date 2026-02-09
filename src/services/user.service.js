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
    return prisma.user.create({
        data        
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

