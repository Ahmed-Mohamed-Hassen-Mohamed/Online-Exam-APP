const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  choice1: {
    type: String,
    required: true,
  },
  choice2: {
    type: String,
    required: true,
  },
  choice3: {
    type: String,
  },
  choice4: {
    type: String,
  },
  answer: {
    type: Number,
    required: true,
  },
  image: {
    type: Buffer,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Exam",
  },
});

questionSchema.methods.toJSON = function () {
  const imageObject = this.toObject();
  return imageObject;
};

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
