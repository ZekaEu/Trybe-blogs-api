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

module.exports = {
  create,
};
