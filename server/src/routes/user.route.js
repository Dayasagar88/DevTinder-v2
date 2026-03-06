import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getFeed, getProfile, updateProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();


userRouter.get("/feed", authMiddleware, getFeed)
userRouter.get("/profile", authMiddleware, getProfile)
userRouter.post("/update-profile", authMiddleware, updateProfile)

export default userRouter;