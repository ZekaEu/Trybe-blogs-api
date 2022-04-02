const { Category } = require('../models');

const create = async (categoryData) => {
  const created = await Category.create(categoryData);
  return created.dataValues;
};

const getAll = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = {
  create,
  getAll,
};
