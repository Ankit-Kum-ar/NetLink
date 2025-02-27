const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const connectDB = require('./config/dbConnection');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
});