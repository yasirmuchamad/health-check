import { prisma } from "../prisma.js";

export const createAuditLog = async (data) => {
    await prisma.auditLog.create({
        data:{
            action:data.action,
            method:data.method,
            endpoint:data.endpoint,
            ipAddress:data.ipAddress,
            oldData:data.oldData,
            newData:data.newData,
            actor: {
               connect:{id:data.actorId} 
            },           
        
            target: {
               connect:{ id:data.targetId}
            }
            
        }
    });
};