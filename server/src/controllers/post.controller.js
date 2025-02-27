const Post = require("../models/post.model");
const cloudinary = require("cloudinary").v2;

const getFeedPosts = async (req, res) => {
    try {
        // Get posts from the people the user is following (connections) and sort them by the most recent first (createdAt: -1).
        const posts = await Post.find({ author: { $in: req.user.connections } }) // Find posts where the author is in the user's connections.
            .populate('author', 'name username profilePicture headline') // Populate the author field with the name, username, and profilePicture.
            .populate('comments.user', 'name profilePicture') // Populate the comments.user field with the name and profilePicture.
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            data: posts
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createPost = async (req, res) => {
    try {
        // Get the content and image from the request body.
        const { content, image } = req.body;
        
        let newPost;

        // If there is an image, upload it to Cloudinary and save the URL in the database.
        if (image) {
            const imgResult = await cloudinary.uploader.upload(image, {
                upload_preset: 'devconnector'
            });
            newPost = new Post({
                author: req.user._id,
                content,
                image: imgResult.secure_url
            })
        } else { // If there is no image, create a post without an image.
            newPost = new Post({
                author: req.user._id,
                content
            });
        }

        await newPost.save(); // Save the new post to the database.

        res.status(201).json({
            status: 'success',
            data: newPost
        });

    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}

const deletePost = async (req, res) => {
    try {
        // Get the post ID from the URL parameter.
        const postId = req.params.id;
        const userId = req.user._id;

        // Find the post by ID.
        const post = await Post.findById(postId);

        // Check if the post exists.
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is the author of the post.
        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        // Remove the image from Cloudinary if there is one.
        if (post.image) {
            // Get the public ID of the image from the URL. 
            const publicId = post.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        // Delete the post.
        await post.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getFeedPosts,
    createPost,
    deletePost
};