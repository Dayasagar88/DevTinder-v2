import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
{
  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    trim: true
  },
  githubId: {
  type: String,
  unique: true,
  sparse: true
},

authProvider: {
  type: String,
  enum: ["local", "github"],
  default: "local"
},

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },

  password: {
    type: String,
    select: false
  },

  headline: {
    type: String,
    default: "Developer"
  },

  bio: {
    type: String,
    default: ""
  },

  profilePhoto: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ""
  },

  skills: {
    type: [String],
    default: []
  },

  techStack: {
    type: [String],
    default: []
  },

  experienceLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },

  yearsOfExperience: {
    type: Number,
    default: 0
  },

  githubUrl: {
    type: String,
    default: ""
  },

  portfolioUrl: {
    type: String,
    default: ""
  },

  lookingFor: {
    type: [String],
    enum: [
      "Project Collaboration",
      "Startup Co-founder",
      "Learning Partner",
      "Networking",
      "Job Opportunities"
    ],
    default: []
  },

  isProfileComplete: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true
}
);

/* ---------------- PASSWORD HASHING ---------------- */

userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

/* ---------------- PASSWORD COMPARE ---------------- */

userSchema.methods.comparePassword = async function (passwordInput) {

  return await bcrypt.compare(passwordInput, this.password);

};

/* ---------------- JWT TOKEN ---------------- */

userSchema.methods.generateJWT = function () {

  return jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

};

const User = mongoose.model("User", userSchema);

export default User;