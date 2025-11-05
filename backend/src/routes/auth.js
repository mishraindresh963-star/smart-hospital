const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req,res)=>{
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ msg: 'User exists' });
    const hashed = await bcrypt.hash(password,10);
    user = new User({ name, email, password: hashed, role });
    await user.save();
    const payload = { user: { id: user._id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '7d' });
    res.json({ token });
  } catch(err) { console.error(err); res.status(500).send('Server error'); }
});

// Login
router.post('/login', async (req,res)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: 'Invalid creds' });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({ msg: 'Invalid creds' });
    const payload = { user: { id: user._id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '7d' });
    res.json({ token });
  } catch(err){ console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
