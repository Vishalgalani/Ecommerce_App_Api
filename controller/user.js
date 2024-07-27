const USER = require('../model/user');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.UserId,
    pass: process.env.UserPassword,
  },
});

async function main(user) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.UserId, // sender address
      to: user, // list of receivers
      subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
      html: "<h1><b>Welcome to shopydry</b></h1>", // html body
    });
  

  }
  
  

//========================token=====================
exports.CHECKJWT = async function (req, res, next) {
  try {
    const token = req.headers.authorization
    if(!token){
      throw new Error("token not found")
    }
    const decode = jwt.verify(token, process.env.JwtSign);
    // console.log(decode.id);
    const checkUser = await USER.findById(decode.id)
    if(!checkUser){
      throw new Error("user not found")
    }
    req.userId = decode.id;
    next()
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
};


//==============================Add user===========================
exports.SIGNUP = async function (req, res, next) {
  try {
    // console.log(req.body);
    if (!req.body.username || !req.body.email || !req.body.password) {
      throw new Error("Please add valid field")
    }
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const data = await USER.create(req.body)
    await main(req.body.email)
    res.status(201).json({
      status: "Success",
      message: "New User Created",
      data: data
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })

  }
};


//==============================Login user===========================
exports.LOGIN = async function (req, res, next) {
  try {
    const checkUser = await USER.findOne({ email: req.body.email })
    if (!checkUser) {
      throw new Error("Invalid Email")
    }
    const checkPass = await bcrypt.compare(req.body.password, checkUser.password)
    if (!checkPass) {
      throw new Error("Invalid Passsword")
    }
   var token = jwt.sign({id: checkUser._id }, process.env.JwtSign);

    res.status(200).json({
      status: "Success",
      message: "Login Successful",
      token
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })

  }
};



//==============================All user===========================
exports.ALLUSER = async function (req, res, next) {
  try {
    // console.log(req.body);
    const data = await USER.find()
    res.status(201).json({
      status: "Success",
      message: "Data is found",
      data: data
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })

  }
};


//==============================Delete user===========================
exports.DELETETUSER = async function (req, res, next) {
  try {
    await USER.findByIdAndDelete(req.userId)
    res.status(200).json({
      status: "Suceess",
      message: "user deleted",
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};


//==============================Update user===========================
exports.EDITUSER = async function (req, res, next) {
  try {
    if(req.body.password){
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }
    await USER.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
      status: "Suceess",
      message: "user updated",
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};


exports.checkjwt = async function (req, res, next ) {
  try {
    const token = req.headers.authorization
    if(!token) {
      throw new Error ("token not found")
    }
    const decode = jwt.verify(token, process.env.Jwt)
    const checkUser = await USER.findById(decode.id)
    if(!checkUser){
      throw new Error("user is not found")
    }
    next()
  } catch (error) {
    res.status(404).json({
      status : "fail",
      message : error.message
    })
  }
}