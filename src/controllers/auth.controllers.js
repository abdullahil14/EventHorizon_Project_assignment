const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

exports.protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.startsWith('Bearer ')
     ? req.headers.authorization.split(' ')[1] : null;

    if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) return res.status(401).json({ message: 'User not found' });
    if (!user.isVerified) return res.status(403).json({ message: 'Email not verified. Please verify first.' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
