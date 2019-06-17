const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');

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
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts', postsRoutes);

module.exports = app;
