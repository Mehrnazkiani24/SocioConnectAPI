const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require("dayjs")

const timestamp = (toDate) =>{
  return dayjs(toDate).format(" MM/DD/YYYY hh:mm:ss")
}
// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughttext: {
      type: String,
      required: true,
      max_length: 50,
    },
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    createAt: {
      type: Date,
      required: true,
      default:Date.now,
      get: time => timestamp(time)
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function(){
  return this.reactions.length
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
