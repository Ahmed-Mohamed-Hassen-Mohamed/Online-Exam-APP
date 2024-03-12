const mongoose = require("mongoose");

const startExamSchema = new mongoose.Schema({
  mark: {
    type: Number,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Exam",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  startExam: {
    type: Date,
    default: Date.now,
  },
});

const StartExam = mongoose.model("StartExam", startExamSchema);
module.exports = StartExam;
