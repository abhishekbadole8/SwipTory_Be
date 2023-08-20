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
    stories_bookmarked: [
      {
        storyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Story",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
