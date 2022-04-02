const { BlogPost } = require('../models');

const create = async (blogPostData) => {
  const created = await BlogPost.create(blogPostData);
  return created.dataValues;
};

module.exports = {
  create,
};
