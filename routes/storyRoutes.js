const express = require("express");
const router = express.Router();
const {
  createStory,
  getStories,
  getStory,
  updateStory,
} = require("../controllers/storyController");
const authHandler = require("../middlewares/authHandler");

router.post("/add", authHandler, createStory); // Add Story
router.get("/", getStories); // Get Story's
router.get("/:storyId", authHandler, getStory); // Get Story

router.patch("/update/:userId/:storyId", authHandler, updateStory); // edit Story
router.delete("/delete/:storyId", authHandler); // delete story

module.exports = router;
