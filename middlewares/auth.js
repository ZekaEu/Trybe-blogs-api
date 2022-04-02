require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const verifyToken = jwt.verify(authorization, SECRET);
    req.token = verifyToken.data;
    next();
  } catch (e) {
    if (e.name.includes('Token')) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  }
};
