const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const postsController = require('../controllers/posts.controller');

router.get('/', (req, res, next) => res.json({ ok: true }));

// USERS

router.get('/users', usersController.list) // utilizaremos el plural del modelo que vamos a buscar
router.post('/users', usersController.create) // no ponemos un /create porque POST ya indica creación

// POSTS

router.get('/posts', postsController.list);
router.post('/posts', postsController.create);

module.exports = router;