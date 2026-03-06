import mongoose from "mongoose"

const matchSchema = new mongoose.Schema(
{
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }

})

const Match = mongoose.model("Match", matchSchema)

export default Match