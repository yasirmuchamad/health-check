import express from "express";
const router = express.Router();

import { createUser, deleteUser, getAuditLogs, getUserById, getUsers, updateUser, validateUser } from "../controllers/user.controller.js";
import { auditMiddleware } from "../middlewares/audit.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/", getUsers);
router.get("/audit", authMiddleware, getAuditLogs);
router.get("/:id", authMiddleware, getUserById);
router.post(
    "/", 
    authMiddleware, 
    validateUser, 
    auditMiddleware("CREATE_USER"), 
    createUser
    );
// router.post("/", authMiddleware, validateUser, createUser);
router.put(
    "/:id", 
    authMiddleware, 
    validateUser, 
    auditMiddleware("UPDATE_USER"),
    updateUser
    );
router.delete(
    "/:id", 
    authMiddleware,
    auditMiddleware("DELETE_USER"), 
    deleteUser
    );

export const userRoutes = router;