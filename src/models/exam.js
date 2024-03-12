const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  examTime: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Group",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
