const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if(!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
    req.user = decoded.user;
    const user = await User.findById(req.user.id);
    if(!user) return res.status(401).json({ msg: 'Invalid user' });
    next();
  } catch(err) { console.error(err); res.status(401).json({ msg: 'Token invalid' }); }
}
