import { Router } from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../services/user.services.js"

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;