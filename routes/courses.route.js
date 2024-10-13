const exprees = require('express');

const router = exprees.Router()

const {body} = require('express-validator');
const courseController = require('../contorallers/courses.cotroaller')

const {  validationSchema  } = require('../middleware/validationSchema');
const verfiyToken = require('../middleware/verfiyToken');
const userRoles = require('../utlis/userRoles');
const allowedTo = require('../middleware/allowedTo')
router.get('/api/courses', courseController.getAllCourses)
// get single course
router.get('/api/courses/:courseId', courseController.getCourse);

router.route('/')
        .get(courseController.getAllCourses)
        .post(verfiyToken, allowedTo(userRoles.MANGER), validationSchema(), courseController)


router.route('/:courseId')
         .get(courseController.getCourse)
         .patch(courseController.updateCourse)
         .delete( verfiyToken, allowedTo(userRoles.ADMIN, userRoles.MANGER), courseController.deleteCourse);

module.exports = router;