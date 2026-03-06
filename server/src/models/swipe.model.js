import mongoose from "mongoose"

const swipeSchema = new mongoose.Schema(
{
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  action: {
    type: String,
    enum: ["like", "pass"],
    required: true
  }

},
{
  timestamps: true
}
)

const Swipe = mongoose.model("Swipe", swipeSchema)

export default Swipe