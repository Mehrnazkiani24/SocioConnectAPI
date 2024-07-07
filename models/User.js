const { Schema, model } = require('mongoose');

// Schema to create a course model
const userSchema = new Schema(
  {
    userName: {
      trim: true,
      type: String,
      required: true,
      unique: true,
    },
    email: {
      unique: true,
      type: Boolean,
      default: true,
      match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,"Enter  valid email"]
    },
    friends: {
      type: Schema.Types.ObjectId,
        ref: 'user',
    },
  
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function(){
  return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;
