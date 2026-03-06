import express from "express"
import { getMatches } from "../controllers/match.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const matchRouter = express.Router()

matchRouter.get("/", authMiddleware, getMatches)

export default matchRouter