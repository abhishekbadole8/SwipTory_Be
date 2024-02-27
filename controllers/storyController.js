const { default: mongoose } = require("mongoose");
const Story = require("../models/storyModel");

// @desc Add Story
// @route POST api/story/add
// @access Private route
const createStory = async (req, res) => {
  try {
    const { userId, heading, description, category, images } = req.body;

    // Check if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: "Invalid user ID format." });
    }

    // Mandatory field check
    if (!userId || !heading || !description || !category || !images) {
      return res.status(400).json({ message: "All field's are mandatory." });
    }

    // Validate number of images
    if (images.length < 3 || images.length > 6) {
      return res
        .status(400)
        .json({ error: "Images should be between 3 and 6." });
    }

    // Create story
    const story = await Story.create({
      userId,
      heading,
      description,
      category,
      images,
    });

    // Check if story creation failed
    if (!story) {
      res.status(404).json({ error: "Failed to create story." });
    }

    // Return the created story
    res.status(201).json(story);
  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// @desc Get Story's
// @route Get api/story/
// @access Public route
const getStories = async (req, res) => {
  try {
    // Extract category from query parameters
    const { category } = req.query;

    // Construct the query based on the presence of category
    const query = category ? { category } : {};

    // Find stories based on the constructed query
    const stories = await Story.find(query);

    // Return the found stories
    res.status(200).json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ error: "Failed to fetch stories." });
  }
};

// @desc Get Story
// @route Get api/story/:storyId
// @access Private route
const getStory = async (req, res) => {
  try {
    const { storyId } = req.params; // _id is StoryId

    // Check if the provided storyId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return res.status(400).json({ error: "Invalid story ID format." });
    }

    // // Find the story by its ID
    const story = await Story.findById(storyId);

    // If no story is found with the given ID
    if (!story) {
      return res.status(404).json({ error: "Story not found." });
    }
    // If the story is found
    res.status(200).json(story);
  } catch (error) {
    console.error("Error fetching story:", error);
    res.status(500).json({ error: "Failed to fetch story." });
  }
};

// @desc Patch Story
// @route Patch api/story/update/:storyId
// @access Private route
const updateStory = async (req, res) => {
  try {
    const { userId, storyId } = req.params;
    const { heading, description, category, images, action } = req.body;

    // Check if the user is authorized to update the story
    if (userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized access to update story." });
    }

    let story = await Story.findById(storyId);

    // Check if the story exists
    if (!story) {
      return res.status(404).json({ error: "Story not found." });
    }

    // Update story based on the provided action
    switch (action) {
      case "updateStoryDetails":
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
        break;
      case "updateLikes":
        const userLiked = story.likes.includes(userId);
        if (userLiked) {
          story.likes = story.likes.filter((id) => id !== userId);
        } else {
          story.likes.push(userId);
        }
        break;
      case "updateBookmarks":
        const userBookmarked = story.bookmarks.includes(userId);
        if (userBookmarked) {
          story.bookmarks = story.bookmarks.filter((id) => id !== userId);
        } else {
          story.bookmarks.push(userId);
        }
        break;
      default:
        return res.status(400).json({ error: "Invalid action." });
    }

    await story.save();
    res.status(200).json({
      story,
      updatedBookmarks: story.bookmarks,
      updatedLikes: story.likes,
    });
  } catch (error) {
    console.error("Error updating story:", error);
    res.status(500).json({ error: "Failed to update story." });
  }
};

module.exports = { createStory, getStories, getStory, updateStory };
