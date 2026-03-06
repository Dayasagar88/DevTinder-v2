import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import { sendMessage, getMessages } from "../controllers/message.controller.js"

const messageRouter = express.Router()

messageRouter.post("/:matchId", authMiddleware, sendMessage)
messageRouter.get("/:matchId", authMiddleware, getMessages)

export default messageRouter