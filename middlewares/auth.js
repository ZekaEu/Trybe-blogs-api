const authService = require('../services/auth');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  const token = authService.verifyToken(authorization);
  if (token.message) return res.status(401).json({ message: 'Expired or invalid token' });
  next();
};
