const express = require("express");
const router = express.Router();
const userAuth = require("../middelware/userAuth");
const user = require("../controllers/user");

router.post("/signin", user.signin);
router.post("/signup", user.signup);
router.post("/sendEmail", user.sendEmail);
router.post("/updatePassword", user.updatePassword);
router.patch("/users", userAuth, user.updateUserById);
router.delete("/Profile", userAuth, user.deleteProfile);
router.get("/Profile", userAuth, user.getProfile);
router.get("/users/:id", userAuth, user.getUserById);

module.exports = router;
