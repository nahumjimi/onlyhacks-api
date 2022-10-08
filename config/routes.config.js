const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const postsController = require('../controllers/posts.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.get('/', (req, res, next) => res.json({ ok: true }));

// AUTH

router.post('/login', authController.login)

// USERS

router.get('/users', usersController.list) // utilizaremos el plural del modelo que vamos a buscar
router.post('/users', usersController.create) // no ponemos un /create porque POST ya indica creación
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)

// POSTS

router.get('/posts', authMiddleware.isAuthenticated, postsController.list);
router.post('/posts', authMiddleware.isAuthenticated, postsController.create);

module.exports = router;