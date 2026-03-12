// import admin from "../config/firebase.js";
import genToken from "../config/token.js";
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

    console.log(error)

    res.status(500).json({
      message: error.message
    })

  }

}

// @desc    User Logout
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

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

export const googleAuth = async (req, res) => {
  try {

    const { name, email, photo } = req.body;

    const firstName = name?.split(" ")[0] || "";
    const lastName = name?.split(" ").slice(1).join(" ") || "";

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email,
        profilePhoto: photo,
        authProvider: "google"
      });
    }

    const token = await user.generateJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "success",
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: `Google auth error ${error}`
    });
  }
};




// export const googleAuth = async (req, res) => {

//   try {

//     const { idToken } = req.body

//     if (!idToken) {
//       return res.status(400).json({
//         success: false,
//         message: "ID token missing"
//       })
//     }

//     const decoded = await admin.auth().verifyIdToken(idToken)

//     const { email, name, picture } = decoded

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Google account email not found"
//       })
//     }

//     let user = await User.findOne({ email })

//     if (!user) {

//       const names = name ? name.split(" ") : ["User"]

//       user = await User.create({
//         firstName: names[0],
//         lastName: names.slice(1).join(" ") || "",
//         email,
//         profilePhoto: picture || "",
//         authProvider: "google",
//         isProfileComplete: false
//       })

//     }

//     const token = user.generateJWT()

//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false
//     })

//     const safeUser = await User.findById(user._id).select("-password")

//     res.json({
//       success: true,
//       user: safeUser
//     })

//   } catch (error) {

//     console.log(error)

//     res.status(401).json({
//       success: false,
//       message: "Google authentication failed"
//     })

//   }

// }