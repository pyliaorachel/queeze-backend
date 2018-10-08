const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const keys = require('../../config/keys');
const errorUtils = require('../utils/error');
const quiz = require('./quiz');
const auth = require('./auth');

// JWT authentication middleware
const authToken = jwt({ secret: keys.secret });

router.use('/quiz', authToken, quiz);
router.use('/', auth);
router.get('*', (req, res) => {
    res.status(404).send(errorUtils.INVALID_ROUTE);
});
router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError')
        res.status(401).send(errorUtils.INVALID_TOKEN);
});

module.exports = router;
