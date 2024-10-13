const express = require('express');

const router = express.Router();

const multer = require('multer');


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb){
        console.log("FILE", file);
        cb(null, 'uploads')
        
    },
    fileName: function(req, file, cb){
        const ext = file.mimtype.split('/')[1]
        const fileName = 'user-${Date.now()}.${ext}';
        cb(null, fileName);

    }
})


const fileFilter = (req, file, cb) => {
    const imageType = file.mimtype.split('/')[0];

    if(imageType === 'image') {
        return cb(null, true);
    } else {
        return cb(appError.create('file must be an image', 400), false);
    }
}

const upload = multer({
      storage: diskStorage,
       fileFilter 
    })



const userContoraller = require('../contorallers/user.contoraller')
const verfiyToken = require('../middleware/verfiyToken');
const appError = require('../utlis/appError');
// get all users 

// register

// login
router.route('/')
          .get(verfiyToken, userContoraller.getAllUsers)

router.route('/register')
          .post(upload.single('avatar'), userContoraller.register)

router.route('/')
          .post(userContoraller.register)
module.exports = router;