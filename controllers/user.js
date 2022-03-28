const userService = require('../services/user');
const { generateToken } = require('../services/auth');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await userService.create({ displayName, email, password, image });
    if (!newUser) return res.status(409).json({ message: 'User already registered' });
    const token = generateToken({ displayName, email, image });
    return res.status(201).json(token);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
};
