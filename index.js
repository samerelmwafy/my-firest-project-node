const exprees = require('express');

const app = exprees();

const path = require('path')
app.use('/uploads', exprees.static(path.join(__dirname,'uploads')));


const mongoose = require('mongoose');
console.log('proccess',process.env.MY_NAME);

const httpStatusText = require('./utlis/httpStatusText')


const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log('mongodb server started');
    
})

app.use(exprees.json());
const coursesRouter = require('./routes/courses.route');
app.use('/', coursesRouter) // localhost / => /api/courses

app.all('*', (req, res, next) => {
    res.status(404).json({ status: httpStatusText.ERROR, message: 'this resource is not available'})
})
 
app.use((error, req, res, next) => {
    res.status(500).json({status: httpStatusText.ERROR, message: error.message})
})


app.listen(4000, () => {
 console.log("listening on port: 4000");
})
