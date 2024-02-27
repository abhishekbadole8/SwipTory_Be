const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const storyRoutes = require("./routes/storyRoutes");
const connectDb = require("./configs/dbConnection");

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/story", storyRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
