
const {validationResult} = require('express-validator')
const Course = require('../models/course.model');
const httpStatusText = require('../utlis/httpStatusText');
const asyncwapper = require('../middleware/asyncwapper');
const getAllCourses = async (req, res) => {
  const query = req.query;
  console.log("query", query);

  const limit = query.limit || 10;
  const page = query.page || 1;
  ['p1','p2','p3','p4','p5','p6','p7','p8']
  const skip = (page - 1) * limit;
  
  const course = await Course.find({}, {"__v":false}.limit(limit))

  res.json({ status: httpStatusText.SUCCESS, data: {courses}})
  // get all courses from DB using Course Model
  
  const courses = await Course.find();

    res.json({ status: "courses"});
}

const getCourse = asyncwapper(
  async (req, res) => {

    const course = await  Course.findById(req.params.courseId);
if(!course){
const error = new Error();
return next(error);
}
return res.json({ status: httpStatusText.SUCCESS, data: {course: null}})
}
)

const addCourse = (req, res) => {

const errors = validationResult(req);
if(!errors.isEmpty()){
 return res.status(400).json(errors.array());
}
}
const newCourse = new Course(req.body);

await newCourse.save()

res.status(201).json({ status: httpStatusText.SUCCESS, data: {course: newCourse}})

const updateCourse = async (req, res) => {
    const courseId = +req.params.courseId;
      const updateCourse = await Course.updateOne({_id: courseId}, {$set: {... req.body}})
      return res.status(200).json({status: httpStatusText.SUCCESS, data: {course: updateCourse}})

     
}

const deleteCourse = (req, res) => {
    const courseId = +req.params.courseId;
   courses = courses.filter((course) => course.id /= courseId)
  
    res.status(200).json({success: true})
  }

module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}
