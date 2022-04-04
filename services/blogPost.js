const { BlogPost, User, Category } = require('../models');

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
  console.log(result[0].categories);
  return result;
};

module.exports = {
  create,
  getAll,
};
