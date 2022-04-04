const { BlogPost, User, Category } = require('../models');
const authService = require('./auth');

const create = async (blogPostData) => {
  const created = await BlogPost.create(blogPostData);
  return created.dataValues;
};

const getAll = async () => {
  const result = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: {
        attributes: [],
      },
    },
  ],
  });
  return result;
};

const getById = async (id) => {
  const gotBlogPost = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: {
        attributes: [],
      },
    },
    ],
  });
  return gotBlogPost;
};

const update = async ({ id, title, content }, token) => {
  const data = authService.verifyToken(token);
  const [userData] = await User.findAll({ where: { email: data } });
  const result = await getById(id);
  if (userData.id !== result.dataValues.id) return false;
  await BlogPost.update({ title, content },
    { where: { id } });
  const [newBlogPost] = await BlogPost.findAll({
    where: { id },
    attributes: ['title', 'content', 'userId'],
    include: [{ model: Category, as: 'categories', through: { attributes: [] },
    }],
  });
  return newBlogPost.dataValues;
};

const obliterate = async (id, token) => {
  const data = authService.verifyToken(token);
  const [userData] = await User.findAll({ where: { email: data } });
  const result = await getById(id);
  if (userData.id !== result.dataValues.id) return false;
  const deleted = await BlogPost.destroy({ where: { id } });
  return deleted;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  obliterate,
};
