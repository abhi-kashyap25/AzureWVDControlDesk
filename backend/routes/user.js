const express = require('express');
const router = express.Router();

// Mock user database (replace with actual database in production)
const users = new Map();

// Middleware to validate user data
const validateUserData = (req, res, next) => {
  const { username, email, role } = req.body;
  
  if (!username || !email || !role) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['username', 'email', 'role']
    });
  }
  
  if (typeof username !== 'string' || username.length < 3) {
    return res.status(400).json({
      error: 'Invalid username',
      message: 'Username must be at least 3 characters long'
    });
  }
  
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({
      error: 'Invalid email format'
    });
  }
  
  next();
};

// Get all users
router.get('/', async (req, res) => {
  try {
    const userList = Array.from(users.values());
    res.status(200).json(userList);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      error: 'Error fetching users',
      message: error.message
    });
  }
});

// Get user by ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = users.get(userId);
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      error: 'Error fetching user',
      message: error.message
    });
  }
});

// Create new user
router.post('/', validateUserData, async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const userId = Date.now().toString();
    
    const newUser = {
      id: userId,
      username,
      email,
      role,
      createdAt: new Date().toISOString()
    };
    
    users.set(userId, newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      error: 'Error creating user',
      message: error.message
    });
  }
});

// Update user
router.put('/:userId', validateUserData, async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, role } = req.body;
    
    if (!users.has(userId)) {
      return res.status(404).json({
        error: 'User not found'
      });
    }
    
    const updatedUser = {
      ...users.get(userId),
      username,
      email,
      role,
      updatedAt: new Date().toISOString()
    };
    
    users.set(userId, updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      error: 'Error updating user',
      message: error.message
    });
  }
});

// Delete user
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!users.has(userId)) {
      return res.status(404).json({
        error: 'User not found'
      });
    }
    
    users.delete(userId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      error: 'Error deleting user',
      message: error.message
    });
  }
});

module.exports = router;