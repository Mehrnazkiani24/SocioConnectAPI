const { Schema, model } = require('mongoose');

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
      type: String,
      default: true,
      match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,"Enter  valid email"]
    },
    friends: [ {
      type: Schema.Types.ObjectId,
        ref: 'User',
    }],
  
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      }
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
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
