const express = require("express");
const router = express.Router();
const instructorAuth = require("../middelware/instructorAuth");
const userAuth = require("../middelware/userAuth");
const answer = require("../controllers/answer");

router.post("/answer", userAuth, answer.addAnswer);
router.get("/answersOfExam/:id", userAuth, answer.getMyAnswersOfExam);
router.get(
  "/answersOfExam",
  userAuth,
  instructorAuth,
  answer.getAnswersOfExam
);
router.get("/answers/:id", userAuth, answer.getAnswer);

module.exports = router;
