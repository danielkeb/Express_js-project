const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.createUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await User.signIn(email, password);

    if (result.success) {
      // Authentication successful
      if (result.success) {
        // Authentication successful, generate token
        const token = User.generateToken(result.user);
  
        // Send token along with user data to the client
        res.status(200).json({ success: true, token});
    } else {
      // Authentication failed
      res.status(401).json({ success: false, message: result.message });
    }
  }}catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});


// Get all users
router.get('get/', async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;
  try {
    const updatedUser = await User.updateUserById(userId, { username, email, password });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await User.deleteUserById(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
