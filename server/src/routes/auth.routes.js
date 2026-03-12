import express from "express";
import { googleAuth, loginUser, logoutUser, signupUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signupUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", logoutUser);

authRouter.post("/google", googleAuth)

export default authRouter;