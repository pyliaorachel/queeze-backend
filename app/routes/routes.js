const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const keys = require('../../config/keys');
const errorUtils = require('../utils/error');
const quiz = require('./quiz');
const auth = require('./auth');

// JWT authentication middleware
const authToken = jwt({ secret: keys.secret });

// CORS
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

router.use('/quiz', authToken, quiz);
router.use('/validate', authToken, (req, res) => res.json({ result: '1' }));
router.use('/', auth);
router.get('*', (req, res) => {
    res.status(404).send(errorUtils.INVALID_ROUTE);
});
router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError')
        res.status(401).json({ error: errorUtils.INVALID_TOKEN });
});

module.exports = router;
