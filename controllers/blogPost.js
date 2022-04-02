const blogPostService = require('../services/blogPost');
const categoryService = require('../services/category');
const userService = require('../services/user');
const authService = require('../services/auth');

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;
    const foundCategories = await categoryService.getIds(categoryIds);
    if (foundCategories.length !== categoryIds.length) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    const email = authService.verifyToken(authorization);
    const [user] = await userService.getAll({ where: { email }, attributes: ['id'] });
    const newPost = await blogPostService.create({ userId: user.dataValues.id, title, content });
    return res.status(201).json(newPost);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
};