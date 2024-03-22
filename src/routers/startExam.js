const express = require("express");
const router = express.Router();
const instructorAuth = require("../middelware/instructorAuth");
const userAuth = require("../middelware/userAuth");
const exam = require("../controllers/startExam");

router.post("/startExam", userAuth, exam.startExam);
router.get("/myExams", userAuth, exam.getMyExams);
router.get("/examResults/:id", userAuth, instructorAuth, exam.getExamResults);
router.get("/myExams/:id", userAuth, exam.getExamById);

module.exports = router;
