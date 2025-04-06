const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

// Register a new user
const register = async (req, res) => {
  console.log("📦 Incoming register request body:", req.body); // 👈 ADD THIS
  const { name, phone, password, role } = req.body;

  try {
    const existing = await User.findOne({ where: { phone } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, phone, password: hashedPassword, role });

    console.log("🔐 Saved Hashed Password:", newUser.password);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Login
const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ where: { name} });
    if (!user) {
      console.log("❌ User not found for name:", name);
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

//update profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { name, password, role } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (role) user.role = role;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user });

  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

module.exports = { register, login , updateProfile};
