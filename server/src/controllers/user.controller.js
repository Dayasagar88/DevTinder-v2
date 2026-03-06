import User from "../models/user.model.js"

export const getFeed = async (req, res) => {

  try {

    const loggedInUser = req.user

    const users = await User.find({
      _id: { $ne: loggedInUser._id }
    })
    .select("-password")
    .limit(10)

    res.json({
      success: true,
      users
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}