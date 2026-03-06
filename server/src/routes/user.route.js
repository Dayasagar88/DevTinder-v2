import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { completeProfile, getFeed, getProfile, updateProfile } from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const userRouter = express.Router();


userRouter.get("/feed", authMiddleware, getFeed)
userRouter.get("/profile", authMiddleware, getProfile)
userRouter.post("/update-profile", authMiddleware, updateProfile)
userRouter.post(
  "/complete-profile",
  authMiddleware,
  upload.single("profilePhoto"),
  completeProfile
)
export default userRouter;