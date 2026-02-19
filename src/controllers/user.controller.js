
import { createAuditLog } from "../services/audit.service.js";
import * as userService from "../services/user.service.js";

export const validateUser = (req, res, next) => {
    const {name, role, email, password} = req.body;

    if (!name || !role || !email || !password){
        return res.status(400).json({message:"Field required"});
    }
    next();
}

export const getUsers = async(req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

export const getUserById = async(req, res) => {
    try {
        const id = Number(req.params.id);

        const user = await userService.getUserById(id);

        if (!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json(user);
    }catch (err){
        res.status(500).json({message:err.message})
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, role, email, password } = req.body;

        if(!name || !role || !email || !password){
            return res.status(400).json({
                message:"name and role are required"
            });
        }
        const user = await userService.createUser({name, role, email, password});
            res.status(201).json(user);
            console.log("Data masuk kontroller")
        } catch (err){
            res.status(500).json({message:err.message});
        }
    };

   export const updateUser = async(req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)){
            return res.staus(400).json({message:"Invalid ID"});         
        }
        const oldUser = await userService.getUserById(id);
        const updateUser = await userService.updateUser(id, req.body);
        
        await createAuditLog({
            actorId:req.user.id,
            targetId:id,
            action:"UPDATE_USER",
            method:req.method,
            endpoint:req.originalUrl,
            ipAddress:req.ip,
            oldData:oldUser,
            newData:updateUser
        });

        res.json(updateUser);

    } catch (err){
        res.status(500).json({message:err.message});
    }
   };

export const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const oldUser = await userService.getUserById(id);

        await userService.deleteUser(id);

        await createAuditLog({
            actorId:req.user.id,
            targetId:id,
            action:"DELETE_USER",
            method:req.method,
            endpoint:req.originalUrl,
            ipAddress:req.ip,
            oldDate:oldUser
        });
        
        res.json({message:"User deleted successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};


export const getAuditLogs = async (req, res) => {
    try {
        const logs = await prisma.getAuditLogs.findMany({
            include: {
                user : {
                    select: {
                        id:true,
                        name:true,
                        role:true
                    }
                }
            },
            orderBy:{
                createAt:"desc"
            }
        });
        res.json(logs);
    }catch(err){
        res.status(500).json({mesage:err.message});
    }
};
