const express = require('express');
const loginController = require('../controllers/login');
const validation = require('../middlewares/validation');

const loginRouter = express.Router();

loginRouter.post(
  '/',
  validation.checkEmail,
  validation.checkPassword,
  loginController,
);

module.exports = loginRouter;
