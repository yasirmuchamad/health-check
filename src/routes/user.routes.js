import express from "express";
const router = express.Router();

import { createUser, deleteUser, getUserById, getUsers, updateUser, validateUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/", getUsers);
// router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.post("/", validateUser, createUser);
// router.post("/", authMiddleware, validateUser, createUser);
router.put("/:id", authMiddleware, validateUser, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export const userRoutes = router;