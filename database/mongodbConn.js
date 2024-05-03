const mongoose = require("mongoose");

const mongodbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error(error);
    throw new Error("Error initializing the database");
  }
};

module.exports = {
  mongodbConn,
};
