const Question = require("../models/question");
const Answer = require("../models/answer");

exports.addQuestion = async (req, res) => {
  try {
    const question = new Question({ ...req.body });
    if (req.file) {
      question.image = req.file.buffer;
    }
    await question.save();
    res.status(200).send(question);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getQuestionsOfExam = async (req, res) => {
  try {
    const exam = req.params.id;
    const questions = await Question.find({ exam });
    if (!questions.length) {
      return res.status(404).send("No questions is found");
    }
    res.status(200).send(questions);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getQuestionOfExam = async (req, res) => {
  try {
    const exam = req.params.id;
    const owner = req.user._id;
    let myPromise = new Promise(async (resolve, reject) => {
      const answers = await Answer.find({ exam, owner }, "question");
      const questionIds = answers.map((answer) => answer.question);
      resolve(questionIds);
    });

    myPromise
      .then(async (questionIds) => {
        const questions = await Question.find({
          exam,
          _id: { $nin: questionIds },
        });
        if (!questions.length) {
          return res.status(404).send("No question is found");
        }
        res.status(200).send(questions[0]);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getCountDocuments = async (req, res) => {
  try {
    const exam = req.params.id;
    const owner = req.user._id;
    const countQuestions = await Question.countDocuments({ exam });
    const countAnswers = await Answer.countDocuments({ exam, owner });
    res.status(200).send({ countQuestions, countAnswers });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const _id = req.params.id;
    const question = await Question.findById(_id);
    if (!question) {
      return res.status(404).send("This question is not found");
    }
    res.status(200).send(question);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateQuestionById = async (req, res) => {
  try {
    const _id = req.params.id;
    const question = await Question.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!question) {
      return res.status(404).send("This question is not found");
    }
    res.status(200).send(question);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteQuestionById = async (req, res) => {
  try {
    const _id = req.params.id;
    const question = await Question.findByIdAndDelete(_id);
    if (!question) {
      return res.status(404).send("This question is not found");
    }
    res.status(200).send(question);
  } catch (err) {
    res.status(500).send(err);
  }
};
