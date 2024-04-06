const mongoose = require("mongoose");
const shortid = require('shortid');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  code: {
    type: String,
    unique: true,
    default: () => shortid.generate().replace(/-/g, ''),
    maxlength: 9
  },
});

groupSchema.methods.toJSON = function () {
  const imageObject = this.toObject();
  return imageObject;
};

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
