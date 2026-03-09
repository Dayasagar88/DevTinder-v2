// import express from "express"
// import passport from "passport"

// const githubRouter = express.Router()

// githubRouter.get("/github",
//   passport.authenticate("github", { scope: ["user:email"] })
// )

// githubRouter.get("/github/callback",
//   passport.authenticate("github", { session: false }),
//   (req, res) => {

//     const token = req.user.getJWT()

//     res.cookie("token", token)

//     res.redirect("http://localhost:5173")
//   }
// )

// export default githubRouter