// import passport from "passport"
// import { Strategy as GitHubStrategy } from "passport-github2"
// import User from "../models/user.model.js"



// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: "/github-auth/github/callback"
//     },

    

//     async (accessToken, refreshToken, profile, done) => {
//       try {

//         console.log(process.env.GITHUB_CLIENT_ID)

//         const email = profile.emails?.[0]?.value

//         let user = await User.findOne({ githubId: profile.id })

//         if (!user) {

//           user = await User.findOne({ email })

//           if (user) {
//             user.githubId = profile.id
//             user.authProvider = "github"
//             await user.save()
//           } else {

//             user = await User.create({
//               firstName: profile.displayName?.split(" ")[0] || "Dev",
//               lastName: profile.displayName?.split(" ")[1] || "",
//               email,
//               githubId: profile.id,
//               authProvider: "github",
//               profilePhoto: profile.photos?.[0]?.value
//             })
//           }
//         }

//         return done(null, user)

//       } catch (err) {
//         console.log("hello")
//         return done(err, null)
//       }
//     }
//   )
// )

// export default passport