const express = require('express');
const blogPostController = require('../controllers/blogPost');
const checkToken = require('../middlewares/auth');
const { checkBlogPost } = require('../middlewares/validation');

const blogPostRouter = express.Router();

blogPostRouter.post('/', checkToken, checkBlogPost, blogPostController.create);

module.exports = blogPostRouter;
