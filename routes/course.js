const express = require('express');
const router = express.Router();
const Course = require('../models/course');

router.post('/add', async (req, res) =>{
const { name, file, author_id} =req.body;
try{
const newCourse = await Course.createCourse(name, file, author_id);
res.status(201).json(newCourse);
}catch(err){
    console.log(err);
}


});

router.get('/', async (req, res) =>{
    const course = await Course.getCourse();
});

module.exports= router;