import User from "../models/user.model.js"

export const getProfile = async (req, res) => {

  try {

    const user = req.user

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(200).json({
      success: true,
      user
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    })

  }

}

export const getFeed = async (req, res) => {

  try {

    const loggedInUser = req.user

    const users = await User.find({
      _id: { $ne: loggedInUser._id }
    })
    .select("-password")

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

export const updateProfile = async (req, res) => {

  try {

    const userId = req.user._id

    const allowedFields = [
      "firstName",
      "lastName",
      "headline",
      "bio",
      "profilePhoto",
      "location",
      "skills",
      "techStack",
      "experienceLevel",
      "yearsOfExperience",
      "githubUrl",
      "portfolioUrl",
      "lookingFor"
    ]

    const updates = {}

    Object.keys(req.body).forEach((key) => {

      if (allowedFields.includes(key)) {
        updates[key] = req.body[key]
      }

    })

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    ).select("-password")

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Profile update failed"
    })

  }

}

export const completeProfile = async (req,res) => {

  try {

    const userId = req.user._id

    const {
      headline,
      bio,
      location,
      skills,
      techStack,
      experienceLevel,
      yearsOfExperience,
      portfolioUrl
    } = req.body

    if(
      !headline ||
      !bio ||
      !location ||
      !skills ||
      !techStack ||
      !experienceLevel ||
      !yearsOfExperience
    ){
      return res.status(400).json({
        success:false,
        message:"Please complete all required fields"
      })
    }

    let profilePhoto = ""

    if(req.file){
      profilePhoto = `/uploads/${req.file.filename}`
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        headline,
        bio,
        location,
        skills: JSON.parse(skills),
        techStack: JSON.parse(techStack),
        experienceLevel,
        yearsOfExperience,
        portfolioUrl,
        ...(profilePhoto && {profilePhoto}),
        isProfileComplete:true
      },
      {new:true}
    ).select("-password")

    res.status(200).json({
      success:true,
      message:"Profile completed successfully",
      user:updatedUser
    })

  } catch (error) {

    res.status(500).json({
      success:false,
      message:"Failed to complete profile"
    })

  }

}