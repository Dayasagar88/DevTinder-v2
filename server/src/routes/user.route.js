import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getFeed } from "../controllers/user.controller.js";

const userRouter = express.Router();


userRouter.get("/feed", authMiddleware, getFeed)

export default userRouter;