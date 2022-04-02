const categoryService = require('../services/category');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryService.create({ name });
    return res.status(201).json(newCategory);
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
  const categories = await categoryService.getAll();
  return res.status(200).json(categories);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getAll,
};
