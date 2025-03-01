const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { getFeedPosts, createPost, deletePost, getPostById, createComment, likePost } = require('../controllers/post.controller');
const postRouter = express.Router();

postRouter.get('/', verifyToken, getFeedPosts);
postRouter.post('/create', verifyToken, createPost);
postRouter.delete('/delete/:id', verifyToken, deletePost);
postRouter.post('/:id', verifyToken, getPostById);
postRouter.post('/:id/comment', verifyToken, createComment);
postRouter.post('/:id/like', verifyToken, likePost);

module.exports = postRouter;