const { default: mongoose } = require("mongoose");
const Story = require("../models/storyModel");
const User = require("../models/userModel");

// @desc Create Story
// @route POST api/story/add
// @access Private route
const createStory = async (req, res) => {
  try {
    const { userId, heading, description, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: "User Id is Invalid" });
    }

    if (!userId || !heading || !description || !category) {
      return res.status(400).json({ message: "All field's are mandatory" });
    }

    let user = await User.findById(userId); // Find User already exist or not

    if (!user) {
      return res
        .status()
        .json({ message: "User not found with the provided ID" });
    }

    let story = await Story.findOne({ userId }); // find story exist

    if (!story) {
      story = await Story.create({ userId, stories: [] });
    }

    story.stories.push({ heading, description, category });
    await story.save();

    res.status(201).json(story.stories[story.stories.length - 1]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get Story's
// @route Get api/story/
// @access Public route
const getStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get Story
// @route Get api/story/:storyId
// @access Private route
const getStory = async (req, res) => {
  try {
    const { storyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return res.status(404).json({ message: "Invalid storyId" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Patch Story
// @route Patch api/story/edit/:storyId
// @access Private route
const updateStory = async (req, res) => {
  try {
    const { storyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return res.status(404).json("Invalid Story id");
    }

    const story = await Story.findOne({ "stories._id":storyId });

    
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createStory, getStories, getStory, updateStory };
