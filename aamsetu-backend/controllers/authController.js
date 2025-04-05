const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

// Register a new user
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    console.log("🔐 Saved Hashed Password:", newUser.password);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(400).json({ message: 'User not found' });
    }

    console.log("🔍 DB Stored Hashed Password:", user.password);
    console.log("🔐 Input Password:", password);

    const valid = await bcrypt.compare(password, user.password);
    console.log("✅ Password Match:", valid);

    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.name, role: user.role }
    });

  } catch (err) {
    console.error("🔥 Error in login:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
