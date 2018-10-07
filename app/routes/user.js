const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    console.log('User login', req.body);
    res.send('logged in');
});

router.post('/register', (req, res) => {
    console.log('User register', req.body);
    res.send('registerred');
});

module.exports = router;
