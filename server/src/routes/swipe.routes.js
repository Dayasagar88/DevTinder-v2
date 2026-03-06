import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import { swipeUser } from "../controllers/swipe.controller.js"


const swipeRouter = express.Router()

swipeRouter.post("/:action/:userId", authMiddleware, swipeUser)

export default swipeRouter