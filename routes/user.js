const express = require('express');
const userController = require('../controllers/user');
const validation = require('../middlewares/validation');
const checkToken = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post(
  '/',
  validation.checkName,
  validation.checkEmail,
  validation.checkPassword,
  userController.create,
);

userRouter.get('/', checkToken, userController.getAll);

module.exports = userRouter;
