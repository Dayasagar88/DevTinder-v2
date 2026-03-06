import Message from "../models/message.model.js"

export const sendMessage = async (req, res) => {

  try {

    const { matchId } = req.params
    const { text } = req.body
    const senderId = req.user._id

    const message = await Message.create({
      matchId,
      senderId,
      text
    })

    res.json({
      success: true,
      message
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}


export const getMessages = async (req, res) => {

  try {

    const { matchId } = req.params

    const messages = await Message.find({
      matchId
    }).populate("senderId", "firstName profilePhoto")

    res.json({
      success: true,
      messages
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}