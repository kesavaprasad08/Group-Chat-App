const User = require("../models/user");

const bcrypt = require("bcrypt");

exports.addUser = async (req, res, next) => {
  try {
    const data = await User.findAll({
      attributes: ["Name", "Email", "Phone", "Password"],
      where: { Email: req.body.email },
    });
    if (data.length === 0) {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        await User.create({
          Name: req.body.name,
          Email: req.body.email,
          Phone: req.body.phone,
          Password: hash,
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

exports.getLoginPage = async(req,res,next)=>{
    try{
        res.sendFile("login.html", { root: "views" });
    }
    catch(err){
res.status(500)
    }
}

exports.loginUser = async (req,res,next) => {
    try{
        const user = await User.findAll({
            attributes:['id','Name','Email','Password'],
            where:{
                Email:req.body.email
            }
        })
        if(user.length!==0){
            bcrypt.compare(req.body.password,user[0].dataValues.Password,(err,result)=>{
                if(!result){
                    res.status(200).json({ message: "User not authorized" });
                }else{
                    res.status(200).json({message:'user login Successfully'})
                }
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message})
    }
}