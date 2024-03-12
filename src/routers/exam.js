const express = require("express");
const router = express.Router();
const instructorAuth = require("../middelware/instructorAuth");
const userAuth = require("../middelware/userAuth");
const exam = require("../controllers/exam");

router.post("/exam", userAuth, instructorAuth, exam.addExam);
router.get("/exams", userAuth, instructorAuth, exam.getMyExams);
router.get("/groupExams/:id", userAuth, exam.getGroupExams);
router.get("/exams/:id", userAuth, exam.getExamById);
router.patch("/exams/:id", userAuth, exam.updateExamById);
router.delete("/exams/:id", userAuth, instructorAuth, exam.deleteExamById);

module.exports = router;
