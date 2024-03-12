const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answer: {
    type: Number,
    required: true,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Exam",
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Question",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
