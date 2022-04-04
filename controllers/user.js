const userService = require('../services/user');
const { generateToken, verifyToken } = require('../services/auth');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await userService.create({ displayName, email, password, image });
    if (!newUser) return res.status(409).json({ message: 'User already registered' });
    const token = generateToken({ displayName, email, image });
    return res.status(201).json({ message: token });
  } catch (e) {
    next(e);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const obliterate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const email = verifyToken(authorization);
    await userService.obliterate(email);
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  obliterate,
};
