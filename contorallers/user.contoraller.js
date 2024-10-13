const asyncwapper = require("../middleware/asyncwapper");
const User = require('../models/user.model');
const appError = require("../utlis/appError");
const httpStatusText = require('../utlis/httpStatusText');


const bcrypt = require('bcryptjs');
const getAllUsers = asyncwapper(async (req,res) => {
    const query = req.query;
  console.log("query", query);

  const limit = query.limit || 10;
  const page = query.page || 1;
  ['p1','p2','p3','p4','p5','p6','p7','p8']
  const skip = (page - 1) * limit;
  
  const users = await User.find({}, {"__v":false, 'password': false}.limit(limit).skip(skip))

  res.json({ status: httpStatusText.SUCCESS, data: {users}})
  // get all courses from DB using Course Model
  
  const courses = await Course.find();

    res.json({ status: "courses"});
})
const register = asyncwapper(async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, password , role} = req.body;
    console.log("req.file ->", req.file);
    
    const oldUser = await User.findOne({ email: email});
    if(oldUser) {
        return res.status(400).json()
    }
    // password hashing
    bcrypt.hash(password)
    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        avatar: req.file.fileName
    })

   await newUser.save();

})

const login = asyncwapper((req, res, next) => {
    const {email, password} = req.body;

    if(!email && !password){
      const error = appError.create('email and password are required', 400, httpStatusText);
      return next(error);
    }
    const user = User.findOne({email: email});
    const matchedpassword = bcrypt.compare(password, user.password);
    if(user && matchedpassword) {
        return res.json({status: httpStatusText.SUCCESS, data: {user: 'logged in succesfully'}})
    } else {
        const error = appError.create('something', 400, httpStatusText);
        return next(error);
    }

})

module.exports = {
    getAllUsers,
    register,
    login,
    role
}