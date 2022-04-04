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
    const newPost = await blogPostService.create({
      userId: user.dataValues.id,
      title,
      content,
      categoryIds });
    return res.status(201).json(newPost);
  } catch (e) {
    next(e);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const allBlogPosts = await blogPostService.getAll();
    return res.status(200).json(allBlogPosts);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundBlogPost = await blogPostService.getById(id);
    if (!foundBlogPost) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(foundBlogPost);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { title, content } = req.body;
    const { id } = req.params;
    const newBlogPost = await blogPostService.update({ id, title, content }, authorization);
    if (!newBlogPost) return res.status(401).json({ message: 'Unauthorized user' });
    return res.status(200).json(newBlogPost);
  } catch (e) {
    next(e);
  }
};

const obliterate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const foundBlogPost = await blogPostService.getById(id);
    if (!foundBlogPost) return res.status(404).json({ message: 'Post does not exist' });
    const exodia = await blogPostService.obliterate(id, authorization);
    if (!exodia) return res.status(401).json({ message: 'Unauthorized user' });
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  obliterate,
};
