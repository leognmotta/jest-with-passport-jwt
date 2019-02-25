const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');

const privateControllers = require('../controllers/privateController');

// /v1/private/protected
router.get('/protected', isAuth, privateControllers.getPrivateRoute);

module.exports = router;
