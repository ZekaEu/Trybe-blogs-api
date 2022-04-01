const loginService = require('../services/login');
const { generateToken } = require('../services/auth');

const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const found = await loginService(email);
    if (!found) return res.status(400).json({ message: 'Invalid fields' });
    const token = generateToken(email);
    return res.status(200).json({ message: token });
  } catch (e) {
    next(e);
  }
};

module.exports = login;
