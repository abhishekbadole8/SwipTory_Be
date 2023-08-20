const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register User
// @route POST api/user/register
// @access public route
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // mandatory field check
    if (!username || !password) {
      return res.status(400).json({ message: "All Field's are Mandatory!" });
    }

    // User Valid check
    const isUserValid = await User.findOne({ username });
    if (isUserValid) {
      return res.status(400).json({ message: "User Already present" });
    }

    // hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json(`Register User Failed: ${error}`);
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
      return res.status(400).json({ message: "All Field's are Mandatory!" });
    }

    // User Valid then send token
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "1d" });
      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ message: "Invalid Credentails Provided" });
    }
  } catch (error) {
    res.status(500).json(`Login User Failed: ${error}`);
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId, storyId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: "User Id is Invalid" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Id Not Found" });
    } else {

      const existingBookmarkIndex = user.stories_bookmarked.findIndex(
        (bookmark) => bookmark.storyId.toString() === storyId
      );

      if (existingBookmarkIndex !== -1) {
        user.stories_bookmarked.splice(existingBookmarkIndex, 1);
      } else {
        user.stories_bookmarked.push({ storyId });
      }
      await user.save();
      res
        .status(200)
        .json({ message: "User bookmark updated successfully", user });
    }
    
  } catch (error) {
    res.status(500).json(`Login User Failed: ${error}`);
  }
};
module.exports = { createUser, loginUser, updateUser };
