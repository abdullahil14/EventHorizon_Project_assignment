const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String, // stored as SHA256 hash
  verificationTokenExpires: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
