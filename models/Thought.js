const { Schema, Types, model} = require("mongoose");

const thoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1, "Minimum length is 1 characters"],
      maxLength: [280, "Max length is 280 characters"],
    },
    username: {
      type: String,
      required: true,
    },
    /////////////// FIX THIS WITH A SUB DOCUMENT/SUB SCHEMA
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction"
      }
    ] // _id values referencing Reaction (sub-model)
  },
  {
    timestamps: true,
  }
)


const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
