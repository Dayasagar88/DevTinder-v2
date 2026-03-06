import Match from "../models/match.model.js"

export const getMatches = async (req, res) => {

  try {

    const userId = req.user._id

    const matches = await Match.find({
      users: userId
    }).populate("users", "firstName headline profilePhoto skills")

    res.json({
      success: true,
      matches
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}