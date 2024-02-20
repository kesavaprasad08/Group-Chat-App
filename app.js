const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();

const user = require("./routes/user");
const homePage = require("./routes/home");
const chat = require("./routes/chat");

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(homePage);

app.use("/user", user);

app.use("/chat", chat);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(3000);
  })
  .catch((er) => console.log(er));
