const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;

