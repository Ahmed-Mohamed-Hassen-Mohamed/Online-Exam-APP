const Exam = require("../models/exam");

exports.addExam = async (req, res) => {
  try {
    const exam = new Exam({ ...req.body, owner: req.user._id });
    await exam.save();
    res.status(200).send(exam);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getMyExams = async (req, res) => {
  try {
    await req.user.populate("exams");
    res.status(200).send(req.user.exams);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getGroupExams = async (req, res) => {
  try {
    const group = req.params.id;
    const exams = await Exam.find({ group }).sort({ _id: -1 });
    if (!exams) {
      return res.status(404).send("No exams are found");
    }
    res.status(200).send(exams);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getExamById = async (req, res) => {
  try {
    const _id = req.params.id;
    const exam = await Exam.findById(_id);
    if (!exam) {
      return res.status(404).send("This exam is not found");
    }
    res.status(200).send(exam);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateExamById = async (req, res) => {
  try {
    const _id = req.params.id;
    const exam = await Exam.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!exam) {
      return res.status(404).send("This exam is not found");
    }
    res.status(200).send(exam);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteExamById = async (req, res) => {
  try {
    const _id = req.params.id;
    const exam = await Exam.findByIdAndDelete(_id);
    if (!exam) {
      return res.status(404).send("This exam is not found");
    }
    res.status(200).send(exam);
  } catch (err) {
    res.status(500).send(err);
  }
};
