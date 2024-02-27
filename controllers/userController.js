const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register User
// @route POST api/user/register
// @access public route
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Mandatory field check
    if (!username || !password) {
      return res.status(400).json({ error: "All Field's are Mandatory!" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user." });
  }
};

// @desc Login User
// @route POST api/user/login
// @access public route
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Mandatory field check
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials provided." });
    }

    // Generate token
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "1d" });

    res.status(200).json({ authToken: token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login user." });
  }
};

module.exports = { createUser, loginUser };
