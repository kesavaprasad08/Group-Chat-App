const userAuthentication = require("../middlewares/auth");

const express = require("express");

const router = express.Router();

const groupController = require("../controllers/group-controller");

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

router.delete('/delete/:id',userAuthentication.authenticate,groupController.deleteUserFromGroup);

router.post('/make-admin',userAuthentication.authenticate,groupController.makeAdmin)

module.exports = router;
