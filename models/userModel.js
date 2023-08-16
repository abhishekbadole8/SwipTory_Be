const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      Required: true,
    },
    password: {
      type: String,
      Required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
