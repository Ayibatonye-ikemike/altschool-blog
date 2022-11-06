const express = require('express')
const ArticleController = require('../controllers/ArticleController');
const getarticles = require("../controllers/getArticles")

const articleRouter = express.Router();

articleRouter.post('/', ArticleController.createArticle)

articleRouter.get('/:id', ArticleController.getMyArticle)

articleRouter.patch('/:id', ArticleController.updateArticle)

articleRouter.delete('/:id', ArticleController.deleteArticle)

articleRouter.get('/', getarticles.getArticles)

module.exports = articleRouter;