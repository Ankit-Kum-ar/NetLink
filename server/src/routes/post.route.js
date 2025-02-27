const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { getFeedPosts, createPost } = require('../controllers/post.controller');
const postRouter = express.Router();

postRouter.get('/', verifyToken, getFeedPosts);
postRouter.post('/create', verifyToken, createPost);
postRouter.delete('/delete/:id', verifyToken, deletePost);

module.exports = postRouter;