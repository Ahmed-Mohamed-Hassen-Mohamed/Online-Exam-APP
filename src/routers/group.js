const express = require("express");
const router = express.Router();
const multer = require("multer");
const userAuth = require("../middelware/userAuth");
const instructorAuth = require("../middelware/instructorAuth");
const group = require("../controllers/group");

const upload = multer({
  fileFilter(req, file, cd) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {
      return cd(new Error("Please upload image"));
    }
    cd(null, true);
  },
});

router.post(
  "/group",
  userAuth,
  instructorAuth,
  upload.single("image"),
  group.addGroup
);
router.get("/groups", userAuth, group.getMyGroups);
router.get("/groups/:id", userAuth, group.getGroupById);
router.patch(
  "/groups/:id",
  userAuth,
  instructorAuth,
  upload.single("image"),
  group.updateGroupById
);
router.delete("/groups/:id", userAuth, instructorAuth, group.deleteGroupById);

module.exports = router;
