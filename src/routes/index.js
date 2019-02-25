const router = require('express').Router();

const authRoutes = require('./authRoutes');
const privateRoutes = require('./privateRoutes');

router.use('/auth', authRoutes);
router.use('/private', privateRoutes);

module.exports = router;
