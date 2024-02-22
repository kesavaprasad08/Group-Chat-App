const express = require("express");
const cors = require("cors");

const dotenv= require('dotenv')

dotenv.config();
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();

const User = require("./models/user");
const Group = require("./models/group");

const user = require("./routes/user");
const homePage = require("./routes/home");
const chat = require("./routes/chat");
const group = require("./routes/group");
const Chat = require("./models/chat");
const UserGroup = require("./models/usergroup");

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(homePage);

app.use("/user", user);

app.use("/chat", chat);

app.use("/groups", group);

Group.hasMany(Chat);
User.hasMany(UserGroup);
Group.hasMany(UserGroup);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(3000);
  })
  .catch((er) => console.log(er));
