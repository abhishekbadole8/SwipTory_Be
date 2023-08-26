const { default: mongoose } = require("mongoose");
const Story = require("../models/storyModel");
const User = require("../models/userModel");

// @desc Create Story
// @route POST api/story/add
// @access Private route
const createStory = async (req, res) => {
  try {
    const { userId, heading, description, category, images } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: "User Id is Invalid" });
    }

    if (!userId || !heading || !description || !category || !images) {
      return res.status(400).json({ message: "All field's are mandatory" });
    } else if (images.length < 3) {
      return res.status(400).json({ message: "Minimum 3 images are required" });
    } else if (images.length > 6) {
      return res.status(400).json({ message: "Maximum 6 images are required" });
    }

    const story = await Story.create({
      userId,
      heading,
      description,
      category,
      images,
    });

    if (!story) {
      res.status(404).json({ message: "Client error" });
    }

    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get Story's
// @route Get api/story/
// @access Public route
const getStories = async (req, res) => {
  try {
    const { category } = req.query;

    let query = {};

    if (category) {
      query = { category: category };
    }

    const stories = await Story.find(query);

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
    const { storyId } = req.params; // _id is StoryId

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return res.status(404).json({ message: "Invalid storyId" });
    }
    const story = Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Patch Story
// @route Patch api/story/edit/:storyId
// @access Private route
const updateStory = async (req, res) => {
  try {
    const { userId, storyId } = req.params;
    const { heading, description, category, images, action } = req.body;

    let story = await Story.findById(storyId);

    if (!story) return res.status(404).json("Story not found");

    if (action === "updateInfoAndImage") {
      if (heading) {
        story.heading = heading;
      }
      if (description) {
        story.description = description;
      }
      if (category) {
        story.category = category;
      }
      if (images) {
        story.images = images;
      }
    } else if (action === "updateLikes") {
      const userLiked = story.likes.includes(userId);
      if (userLiked) {
        story.likes = story.likes.filter((id) => id !== userId);
      } else {
        story.likes.push(userId);
      }
    } else if (action === "updateBookmarks") {
      const userBookmarked = story.bookmarks.includes(userId);
      if (userBookmarked) {
        story.bookmarks = story.bookmarks.filter((id) => id !== userId);
      } else {
        story.bookmarks.push(userId);
      }
    }

    await story.save();
    res.status(200).json({
      message: "Story updated successfully",
      updatedBookmarks: story.bookmarks,
      updatedLikes: story.likes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createStory, getStories, getStory, updateStory };
