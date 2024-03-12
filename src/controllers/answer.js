const Answer = require("../models/answer");

exports.addAnswer = async (req, res) => {
  try {
    const answers = await Answer.findOne({
      exam: req.body.exam,
      question: req.body.question,
      owner: req.user._id,
    });
    if (answers) {
      return res.status(404).send("answer is found");
    }
    const answer = new Answer({ ...req.body, owner: req.user._id });
    await answer.save();
    res.status(200).send(answer);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAnswersOfExam = async (req, res) => {
  try {
    const exam = req.params.id;
    const answers = await Answer.find({ exam, owner: req.user._id }).populate(
      "question"
    );
    if (!answers) {
      return res.status(404).send("No answers is found");
    }
    res.status(200).send(answers);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAnswer = async (req, res) => {
  try {
    const question = req.params.id;
    const answer = await Answer.findOne({ question, owner: req.user._id });
    if (!answer) {
      return res.status(404).send("This answers is not found");
    }
    res.status(200).send(answer);
  } catch (err) {
    res.status(500).send(err);
  }
};
