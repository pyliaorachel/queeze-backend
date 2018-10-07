const express = require('express');
const router = express.Router();

const quiz = require('./quiz');
const user = require('./user');

router.use('/quiz', quiz);
router.use('/', user);
router.get('*', (req, res) => {
    res.status(404).send('Page does not exist');
});

module.exports = router;
