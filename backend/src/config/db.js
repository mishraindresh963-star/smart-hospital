const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/smart_hospital';
  await mongoose.connect(uri);
  console.log('MongoDB connected to', uri);
};

module.exports = connectDB;
