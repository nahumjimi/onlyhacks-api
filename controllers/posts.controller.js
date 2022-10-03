const Post = require('../models/Post.model');

module.exports.list = (req, res, next) => {
  Post.find()
    .populate('user')
    .then(posts => {
      res.json(posts);
    })
    .catch(next)
}

module.exports.create = (req, res, next) => {
  Post.create(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(next)
}