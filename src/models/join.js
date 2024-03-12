const mongoose = require("mongoose");

const joinSchema = new mongoose.Schema({
  joiningTime: {
    type: Date,
    default: Date.now,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Group",
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Join = mongoose.model("Join", joinSchema);
module.exports = Join;
