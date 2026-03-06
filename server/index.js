import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"

import { connectDB } from "./src/config/db.js"
import { initSocket } from "./src/sockets/socket.js"

import authRouter from "./src/routes/auth.routes.js"
import userRouter from "./src/routes/user.route.js"
import swipeRouter from "./src/routes/swipe.routes.js"
import matchRouter from "./src/routes/match.routes.js"
import messageRouter from "./src/routes/message.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

/* Middlewares */

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
)

/* Test Route */

app.get("/", (req, res) => {
  res.send("DevTinder V2 Backend Running")
})

/* API Routes */

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/swipe", swipeRouter)
app.use("/api/matches", matchRouter)
app.use("/api/messages", messageRouter)

/* Start Server */

const startServer = async () => {

  await connectDB()

  const server = http.createServer(app)

  initSocket(server)

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

}

startServer()