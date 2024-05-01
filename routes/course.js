const express = require('express');
const router = express.Router();
const multer = require('multer');
const Course = require('../models/course');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf');
  }
});

// Multer instance for handling file uploads
const upload = multer({ storage: storage });

// POST route to add a new course with file upload
router.post('/add', upload.single('file'), async (req, res) => {
  const { name, author_id } = req.body;
  const file = req.file.filename; // Corrected access to filename

  try {
    const newCourse = await Course.createCourse(name, file, author_id);
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route to fetch all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.getCourse();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

module.exports= router;