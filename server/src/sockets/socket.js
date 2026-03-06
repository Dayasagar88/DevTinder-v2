import { Server } from "socket.io"

export const initSocket = (server) => {

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true
    }
  })

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id)

    socket.on("joinMatch", (matchId) => {
      socket.join(matchId)
    })

    socket.on("sendMessage", (data) => {

      const { matchId, message } = data

      io.to(matchId).emit("receiveMessage", message)

    })

    socket.on("disconnect", () => {
      console.log("User disconnected")
    })

  })

}