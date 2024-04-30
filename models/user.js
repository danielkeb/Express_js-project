const pool = require('../db');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secretKey = 'Top secret key';
class User {
  static async createUser(username, email, password) {
    try {
        // Hash the password using Argon2
        const hashedPassword = await argon2.hash(password);
  
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [username, email, hashedPassword]; // Use hashed password
        const { rows } = await pool.query(query, values);
        return rows[0];
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
  }
  static async signIn(email, password) {
    try {
      // Find user by email
      const query = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await pool.query(query, [email]);
      const user = rows[0];

      if (!user) {
        // User not found
        return { success: false, message: 'User not found' };
      }

      // Verify password using Argon2
      const passwordMatch = await argon2.verify(user.password, password);
      if (passwordMatch) {
        // Passwords match, return the authenticated user
        return { success: true, user };
      } else {
        // Passwords don't match
        return { success: false, message: 'Incorrect password' };
      }
    } catch (error) {
      console.error('Error signing in user:', error);
      throw error;
    }
  }
  static generateToken(user) {
    // Generate a token with user information
    return jwt.sign({ id: user.id, username: user.username, email: user.email }, secretKey, { expiresIn: '1h' });
  }
  static async getAllUsers() {
    const query = 'SELECT * FROM users';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async updateUserById(userId, updatedData) {
    const query = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *';
    const values = [updatedData.username, updatedData.email, updatedData.password, userId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async deleteUserById(userId) {
    const query = 'DELETE FROM users WHERE id = $1';
    await pool.query(query, [userId]);
    return true;
  }
  static async sigIn(email, password) {
    const query = 'SELECT * FROM users WHERE email =$1 AND password =$2';

  }
}

module.exports = User;
