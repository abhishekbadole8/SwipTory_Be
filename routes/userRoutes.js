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

module.exports = router;
