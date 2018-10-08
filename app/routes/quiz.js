const express = require('express');
const router = express.Router();
const quiz = require('../controllers/quiz');

router.get('/', quiz.readList);
router.post('/create', quiz.create);
router.get('/:quizName', quiz.read);
router.post('/:quizName/edit', quiz.edit);
router.get('/:quizName/delete', quiz.del);

module.exports = router;
