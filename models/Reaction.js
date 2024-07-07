const { Schema, Types } = require('mongoose');
const dayjs = require("dayjs")
const timestamp = (toDate) =>{
  return dayjs(toDate).format(" MM/DD/YYYY hh:mm:ss")
}
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionbody: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
    },
    username: {
      type: string,
      required: true,
    },
    createAt: {
      type: Date,
      required: true,
      default:Date.now,
      get: time => timestamp(time)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
