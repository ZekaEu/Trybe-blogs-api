const express = require('express');
const userController = require('../controllers/user');
const validation = require('../middlewares/validation');

const userRouter = express.Router();

userRouter.post(
  '/',
  validation.checkName,
  validation.checkEmail,
  validation.checkPassword,
  userController.create,
);

module.exports = userRouter;
