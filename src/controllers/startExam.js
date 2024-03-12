const StartExam = require("../models/startExam");

exports.startExam = async (req, res) => {
  try {
    const _exam = await StartExam.findOne({
      exam: req.body.exam,
      owner: req.user._id,
    });
    if (_exam) {
      return res.status(200).send(_exam);
    }
    const exam = new StartExam({ ...req.body, owner: req.user._id });
    await exam.save();
    res.status(200).send(exam);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getMyExams = async (req, res) => {
  try {
    const owner = req.user._id;
    const exams = await StartExam.find({ owner }).populate(
      "exam",
      "title group owner"
    );
    if (!exams.length) {
      return res.status(404).send("No exam is found");
    }
    for (let exam of exams) {
      await exam.exam.populate("owner", "lastname firstname");
      await exam.exam.populate("group", "name");
    }
    res.status(200).send(exams);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getExamById = async (req, res) => {
  try {
    const _id = req.params.id;
    const exam = await StartExam.findById(_id);
    if (!exam) {
      return res.status(404).send("This exam is not found");
    }
    res.status(200).send(exam);
  } catch (err) {
    res.status(500).send(err);
  }
};
