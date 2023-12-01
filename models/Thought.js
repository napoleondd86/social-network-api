// const mongoose = require("mongoose"); // NOT NEEDED
const { Schema, model } = require("mongoose");
// import Sub Document
const reactionSchema = require("./Reaction")

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
    
    reactions: [reactionSchema], // references sub Doc
  },
  {
    timestamps: true,
  }
)


const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

/*
each user can have many thoughts
each user can have many thoughts
each thought can have many reactions
each thought can have one user
each reaction can have one thought
each reaction can have one user
*/