import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const authMiddleware = async (req, res, next) => {

  try {

    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.userId)

    req.user = user

    next()

  } catch (error) {

    res.status(401).json({
      message: "Invalid token"
    })

  }

}

export default authMiddleware