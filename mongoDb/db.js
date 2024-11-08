const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=joke-db`;

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;