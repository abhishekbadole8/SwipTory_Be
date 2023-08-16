const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGOOSE_CONNECTION);
    if (connect) {
      console.log(`Connected To Database Successfully`);
    }
  } catch (error) {
    console.log(`Error Connecting To Database: ${error}`);
  }
};

module.exports = connectDb;
