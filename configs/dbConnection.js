const { default: mongoose } = require("mongoose");

// Set the strictQuery option to false to prepare for the change in Mongoose 7
mongoose.set('strictQuery', false);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION);
    console.log(`Connected To Database`);
  } catch (error) {
    console.log(`Error Connecting To Database: ${error.message}`);
  }
};

module.exports = connectDb;
