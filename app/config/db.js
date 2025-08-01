const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectedDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connectedDb.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
