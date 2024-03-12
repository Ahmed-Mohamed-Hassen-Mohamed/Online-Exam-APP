const express = require("express");
const router = express.Router();
const userAuth = require("../middelware/userAuth");
const join = require("../controllers/join");

router.post("/join", userAuth, join.JoinGroup);
router.get("/joins", userAuth, join.getJoins);
router.get("/members/:id", userAuth, join.getMembers);
router.get("/joins/:id", userAuth, join.getJoinById);
router.delete("/joins/:id", userAuth, join.deleteJoinById);

module.exports = router;
