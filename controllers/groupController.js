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
    });
    res.status(200).json({ newGroup });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

exports.getGroups = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
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
    const newUserGroup = await UserGroup.create({
      UserId: user.id,
      GroupId: Number(req.body.GroupId),
      GroupName: req.body.GroupName,
    });
    res.status(202).json(newUserGroup);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
