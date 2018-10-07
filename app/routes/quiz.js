const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Quiz list');
    res.send('quiz');
});

router.post('/create', (req, res) => {
    console.log('Quiz create', req.body);
    res.send('quiz created');
});

router.get('/:quizId', (req, res) => {
    console.log('Quiz', req.params.quizId);
    res.send('quiz ' + req.params.quizId);
});

router.post('/:quizId/edit', (req, res) => {
    console.log('Quiz edit', req.params.quizId, req.body);
    res.send('quiz edited ' + req.params.quizId);
});

router.get('/:quizId/delete', (req, res) => {
    console.log('Quiz delete', req.params.quizId);
    res.send('quiz deleted ' + req.params.quizId);
});

module.exports = router;
