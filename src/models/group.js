const mongoose = require("mongoose");

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
//   code: {
//     type: String,
//     default: generateUniqueCode,
//     unique: true,
//   },
});

// function generateUniqueCode() {
//   // Logic to generate a unique code, for example:
//   return Math.random().toString(36).substr(2, 6); // Generates a random alphanumeric code
// }

groupSchema.methods.toJSON = function () {
  const imageObject = this.toObject();
  return imageObject;
};

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
