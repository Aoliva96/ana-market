const router = require('express').Router();
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');

router.use('/users', userRoutes);
router.use('/items', itemRoutes);

module.exports = router;
