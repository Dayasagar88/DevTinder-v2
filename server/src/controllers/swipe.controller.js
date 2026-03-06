import Swipe from "../models/swipe.model.js"
import Match from "../models/match.model.js"

export const swipeUser = async (req, res) => {

  try {

    const { action, userId } = req.params
    const fromUserId = req.user._id

    if (!["like", "pass"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" })
    }

    const existingSwipe = await Swipe.findOne({
      fromUserId,
      toUserId: userId
    })

    if (existingSwipe) {
      return res.status(400).json({
        message: "Already swiped"
      })
    }

    const swipe = await Swipe.create({
      fromUserId,
      toUserId: userId,
      action
    })

    let isMatch = false

    if (action === "like") {

      const oppositeSwipe = await Swipe.findOne({
        fromUserId: userId,
        toUserId: fromUserId,
        action: "like"
      })

      if (oppositeSwipe) {

        await Match.create({
          users: [fromUserId, userId]
        })

        isMatch = true
      }

    }

    res.json({
      success: true,
      isMatch
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}