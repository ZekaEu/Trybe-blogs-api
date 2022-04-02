const express = require('express');
const categoryController = require('../controllers/category');
const checkToken = require('../middlewares/auth');
const { checkCategoryName } = require('../middlewares/validation');

const categoryRouter = express.Router();

categoryRouter.post('/', checkToken, checkCategoryName, categoryController.create);

categoryRouter.get('/', checkToken, categoryController.getAll);

module.exports = categoryRouter;
