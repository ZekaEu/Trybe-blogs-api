const express = require('express');
const blogPostController = require('../controllers/blogPost');
const checkToken = require('../middlewares/auth');
const { checkBlogPost, checkNewBlogPost } = require('../middlewares/validation');

const blogPostRouter = express.Router();

blogPostRouter.post('/', checkToken, checkBlogPost, blogPostController.create);

blogPostRouter.get('/', checkToken, blogPostController.getAll);

blogPostRouter.get('/:id', checkToken, blogPostController.getById);

blogPostRouter.put('/:id', checkToken, checkNewBlogPost, blogPostController.update);

module.exports = blogPostRouter;
