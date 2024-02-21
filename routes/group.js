const userAuthentication = require("../middlewares/auth");

const express = require("express");

const router = express.Router();

const groupController = require("../controllers/groupController");

router.post(
  "/createGroup",
  userAuthentication.authenticate,
  groupController.createGroup
);

router.get(
  "/getGroups",
  userAuthentication.authenticate,
  groupController.getGroups
);

router.post("/addUser", groupController.addNewUser);

module.exports = router;
