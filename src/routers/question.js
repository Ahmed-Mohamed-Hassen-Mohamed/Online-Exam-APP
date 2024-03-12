const express = require("express");
const router = express.Router();
const multer = require("multer");
const instructorAuth = require("../middelware/instructorAuth");
const userAuth = require("../middelware/userAuth");
const question = require("../controllers/question");

const upload = multer({
  fileFilter(req, file, cd) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {
      return cd(new Error("Please upload image"));
    }
    cd(null, true);
  },
});

router.post(
  "/question",
  userAuth,
  instructorAuth,
  upload.single("image"),
  question.addQuestion
);
router.get("/question/:id", userAuth, question.getQuestionOfExam);
router.get("/countDocuments/:id", userAuth, question.getCountDocuments);
router.get("/questionsOfExam/:id", userAuth, question.getQuestionsOfExam);
router.get("/questions/:id", userAuth, question.getQuestionById);
router.patch("/questions/:id", userAuth, question.updateQuestionById);
router.delete(
  "/questions/:id",
  userAuth,
  instructorAuth,
  question.deleteQuestionById
);

module.exports = router;
