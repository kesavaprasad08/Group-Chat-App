const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const cron = require("./cronJob/archiveMessages");

const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

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
    cron();
    server.listen(3000);
    io.on("connection", (socket) => {
      socket.on("new-user", (data) => {
        io.emit("user-connected", data);
      });
      socket.on("send-chat-message", (data) => {
        io.emit("chat-messages", data);
      });
      socket.on('new-group',(data)=>{
        io.emit('new-group',data)
      })
    });
  })
  .catch((er) => console.log(er));
