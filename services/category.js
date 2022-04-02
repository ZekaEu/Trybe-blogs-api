const { Category } = require('../models');

const create = async (categoryData) => {
  const created = await Category.create(categoryData);
  return created.dataValues;
};

module.exports = {
  create,
};
