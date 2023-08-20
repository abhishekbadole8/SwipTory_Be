const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");
const authHandler = require("../middlewares/authHandler");

router.post("/register", createUser);
router.post("/login", loginUser);
router.patch("/add-bookmark", authHandler, updateUser); // Here User Added Bookmarks are saved

module.exports = router;
