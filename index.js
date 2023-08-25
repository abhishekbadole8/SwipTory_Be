const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParse = require("body-parser");
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const storyRoutes = require("./routes/storyRoutes");
const connectDb = require("./configs/dbConnection");

connectDb();
app.use(cors());
// app.use(bodyParse.json()); // Body
// app.use(bodyParse.urlencoded({ extended: false })); // Url data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/story", storyRoutes);

app.listen(port, () => {
  console.log(`Server Connected To Port: ${port}`);
});
