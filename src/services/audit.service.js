import { prisma } from "../prisma.js";

export const createAuditLog = async (data) => {
    await prisma.auditLog.create({
        data:{
            action:"UPDATE_USER",
            method:"PUT",
            endpoint:req.originalUrl,
            ipAddress:req.ip,
            oldData:oldUser,
            newData:updateUser,
            actor:{
                connect:{id:req.user.id}
            },
            target:{
                connect:{ id:parseInt(req.param.id)}
            }
        }
    });
};