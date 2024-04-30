const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/course');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
