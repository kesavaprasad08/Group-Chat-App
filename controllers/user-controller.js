const User = require("../models/user");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const Chat = require("../models/chat");

function generateAccessToken(id, name) {
  return jwt.sign({ userId: id, name: name }, "abc");
}

exports.addUser = async (req, res, next) => {
  try {
    const data = await User.findAll({
      attributes: ["name", "email", "phone", "password"],
      where: { Email: req.body.email },
    });
    if (data.length === 0) {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        await User.create({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: hash,
        });
      });
      res.status(200).json({ message: "User Created Successfully" });
    } else {
      res.status(201).json({ message: "User Already Exists" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLoginPage = async (req, res, next) => {
  try {
    res.sendFile("login.html", { root: "views" });
  } catch (err) {
    res.status(500);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findAll({
      attributes: ["id", "name", "email", "password"],
      where: {
        email: req.body.email,
      },
    });
    await Chat.create({
      messages: user[0].dataValues.name + " has joined the chat",
    });

    if (user.length !== 0) {
      bcrypt.compare(
        req.body.password,
        user[0].dataValues.password,
        (err, result) => {
          if (!result) {
            return res.status(501).json({ message: "user not authorized" });
          } else {
            return res.status(200).json({
              status: "success",
              message: "User  authorized",
              name:user[0].dataValues.name,
              token: generateAccessToken(
                user[0].dataValues.id,
                user[0].dataValues.name
              ),
            });
          }
        }
      );
    } else {
      throw new Error("user not found");
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
