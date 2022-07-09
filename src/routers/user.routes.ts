import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserController,
  loadUserController,
  updateUserController,
} from "../controllers/user.controllers";
import verifyEmailMiddleware from "../middlewares/verifyEmail.middleware";

const userRoutes = Router();

userRoutes.post("", verifyEmailMiddleware, createUserController);
userRoutes.get("", listUserController);
userRoutes.get("/:id", loadUserController);
userRoutes.patch("/:id", verifyEmailMiddleware, updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
