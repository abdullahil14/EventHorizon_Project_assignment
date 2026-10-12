const express = require('express');
const { protect } = require('../controllers/auth.controllers');
const router = express.Router();

router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Protected profile', user: req.user });
});

module.exports = router;

