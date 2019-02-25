const router = require('express').Router();

const authControllers = require('../controllers/authController');

// /v1/auth/signup
router.post('/signup', authControllers.postSignUP);

// /v1/auth/signin
router.post('/signin', authControllers.postSignIn);

module.exports = router;
