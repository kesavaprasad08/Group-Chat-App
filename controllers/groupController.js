const { response } = require("express");
const Group = require("../models/group");
const User = require("../models/user");
const UserGroup = require("../models/usergroup");

exports.createGroup = async (req, res, next) => {
  try {
    const newGroup = await Group.create({
      Name: req.body.name,
    });
    const newUserGroup = await UserGroup.create({
      UserId: req.user.dataValues.id,
      GroupId: newGroup.id,
      GroupName: req.body.name,
      IsAdmin: true,
    });
    res.status(200).json({ newGroup });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

exports.getGroups = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const groups = await UserGroup.findAll({
      where: {
        UserId: userId,
      },
    });
    res.status(200).json({ groups });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.addNewUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { Email: req.body.email } });
    if (user) {
      const newUserGroup = await UserGroup.create({
        UserId: user.id,
        GroupId: Number(req.body.GroupId),
        GroupName: req.body.GroupName,
        IsAdmin: false,
      });
      res.status(202).json(newUserGroup);
    } else {
      throw new Error("No User Found");
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

exports.deleteUserFromGroup = async (req, res, next) => {
  try {
    const currentUser = req.user.id;
    const UserToBeDeleted = req.params.id.split("-")[0];
    const groupToBeDeletedFrom = req.params.id.split("-")[1];
    const user = await UserGroup.findOne({
      where: {
        UserId: currentUser,
        GroupId: groupToBeDeletedFrom,
      },
    });
    if (user.IsAdmin) {
      const deleteUser = await UserGroup.destroy({
        where: { GroupId: groupToBeDeletedFrom, UserId: UserToBeDeleted },
      });
    } else {
      response
        .status(501)
        .json({ message: "Only  Admin is Allowed to remove an user" });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

exports.makeAdmin = async (req, res, next) => {
  try {
    const current = req.user.id;
    const userToBeMadeAmin = req.body.userId;
    const groupId = req.body.groupId;
    const user = await UserGroup.findOne({
      where: {
        UserId: current,
        GroupId: groupId,
      },
    });
    if (user.IsAdmin) {
      const userToBeAdmin = await UserGroup.findOne({
        where: {
          UserId: userToBeMadeAmin,
          GroupId: groupId,
        },
      });
      await userToBeAdmin.update({
        IsAdmin: true,
      });
      res.status(200).json({ message: "User status updated Successfully" });
    } else {
      res.status(401).json({ message: "ONLY ADMIN CAN MODIFY" });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
