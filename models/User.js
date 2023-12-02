const { Schema, model } = require("mongoose");

const userSchema = new Schema (
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, //  
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function(v) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v) 
        },
        message: "Please provide a valid email!"
      },
      required: true,
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
      }],

  },
  {
    timestamps: true,
    toJSON: {
      
    },
    id: false,
    
  }
  )


userSchema.virtual("friendCount").get(function() {
  return this.friends?.length;
});
  
const User = model("User", userSchema);

module.exports = User;
