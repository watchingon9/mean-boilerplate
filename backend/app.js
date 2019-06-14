const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

// mongoose
//   .connect(
//     'mongodb+srv://reina:reina@cluster0-r21bz.mongodb.net/ng-posts?retryWrites=true&w=majority',
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log('Connected!'));

mongoose
  .connect('mongodb://127.0.0.1:27017/ng-posts?connectTimeoutMS=6000', {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected!'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(docs => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: docs
    });
  });
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully!',
      postId: createdPost._id
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Post deleted!' });
  });
});

module.exports = app;
