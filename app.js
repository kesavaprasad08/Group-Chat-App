const express = require('express');

const cors =require('cors');

const bodyParser= require('body-parser');

const sequelize = require('./util/database');

const app =express();

const user = require('./routes/user')
const homePage = require('./routes/home');

app.use(cors({
    origin:'http://localhost:3000',
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(homePage);

app.use('/user',user)


sequelize.sync({force:false})   
.then(()=>{
    app.listen(3000)
})
.catch(er => console.log(er));
