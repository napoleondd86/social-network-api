//////////////////  MAKE THIS SUB DOCUMENT Schema FOR THOUGHT model

const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: [280, "Max length of 280 characters"],
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true},
    id: false,
    // toObject: { getters: true } //IDK IF I NEED THIS ???????
  }
)

const Reaction = mongoose.model("Reaction", reactionSchema);


module.exports = Reaction;