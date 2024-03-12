const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const port = process.env.PORT;
require("./db/mongoose");
app.use(express.json());
app.use(cors());
app.use(helmet());
const userRouter = require("./routers/user");
const examRouter = require("./routers/exam");
const questionRouter = require("./routers/question");
const answerRouter = require("./routers/answer");
const startExamRouter = require("./routers/startExam");
const groupRouter = require("./routers/group");
const joinRouter = require("./routers/join");
app.use(userRouter)
app.use(examRouter)
app.use(questionRouter)
app.use(answerRouter)
app.use(startExamRouter)
app.use(groupRouter)
app.use(joinRouter)
app.listen(port, () => {
  console.log("Server is running");
});