const { Op } = require('sequelize');
const { Category } = require('../models');

const create = async (categoryData) => {
  const created = await Category.create(categoryData);
  return created.dataValues;
};

const getAll = async () => {
  const result = await Category.findAll();
  return result;
};

const getIds = async (arr) => {
  const find = await Category.findAll({
    where: {
      id: { [Op.or]: arr },
    },
  });
  return find;
};

module.exports = {
  create,
  getAll,
  getIds,
};
