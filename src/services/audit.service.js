import { prisma } from "../prisma.js";

export const createAuditLog = async ([
    userId,
    action,
    method,
    endpoint
]) => {
    return prisma.auditLog.create({
        data:{
            userId,
            action,
            method,
            endpoint
        }
    });
};