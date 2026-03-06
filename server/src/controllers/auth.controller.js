import User from "../models/user.model.js";

// @desc    User Signup
export const signupUser = async (req, res ) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await user.save();

    const token = user.generateJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    User Login
export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await User
      .findOne({ email })
      .select("+password")

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const token = user.generateJWT()

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    })

    res.json({
      success: true,
      user
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// @desc    User Logout
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");

    res.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
