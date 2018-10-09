const User = require('../models/user');
const Quiz = require('../models/quiz');
const Question = require('../models/question');

/* Validation helper functions */

function _validateQuizName(username, quizName, originalQuizName) {
    return new Promise((resolve, reject) => {
        if (originalQuizName && quizName == originalQuizName)
            resolve();

        Quiz.count({ name: quizName, user: username })
            .then(cnt => {
                if (cnt == 0)
                    resolve();
                else
                    reject('Quiz name must be unique.');
            }).catch(err => {
                reject(err);
            }); 
    });
}

function _validateHasQuiz(username, quizName) {
    return new Promise((resolve, reject) => {
        Quiz.count({ name: quizName, user: username })
            .then(cnt => {
                if (cnt == 0)
                    reject('No such quiz.');
                else
                    resolve();
            }).catch(err => {
                reject(err);
            }); 
    });
}

/* CRUD operations */

function _create(username, quizName, questionsData) {
    console.log('Quiz create', username, quizName, questionsData);
    return new Promise((resolve, reject) => {
        // Create quiz & questions
        const quiz = new Quiz({ name: quizName, user: username });

        const questions = [];
        questionsData.forEach(questionData => {
            const question = new Question(Object.assign({}, questionData, {
                user: username,
                quizName,
            }));
            questions.push(question);
            quiz.questions.push(question._id);
        });

        // Validate and save questions & quiz; add to user list
        _validateQuizName(username, quizName)
            .then(result => {
                return Question.insertMany(questions);
            }).then(result => {
                return quiz.save();
            }).then(result => {
                return User.findOneAndUpdate({ username: username }, { $push: { quizzes: quizName }});
            }).then(originalData => { // if want the updated data, add `{ new: true }` above
                resolve({ id: quiz._id });
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

function _readList(username) {
    console.log('Quiz readList', username);
    return new Promise((resolve, reject) => {
        Quiz.find({ user: username })
            .then(quizzes => {
                resolve({ data: quizzes });
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
};

function _read(username, quizName) {
    console.log('Quiz', username, quizName);
    return new Promise((resolve, reject) => {
        _validateHasQuiz(username, quizName)
            .then(result => {
                return Question.find({ user: username, quizName });
            }).then(questions => {
                resolve({ data: questions });
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
};

function _edit(username, originalQuizName, quizName, questionsData) {
    console.log('Quiz edit', username, originalQuizName, quizName, questionsData);
    return new Promise((resolve, reject) => {
        // TODO: for now, edit is simply del + create; choose a more efficient logic
        _validateHasQuiz(username, originalQuizName)
            .then(result => {
                return _validateQuizName(username, quizName, originalQuizName)
            }).then(result => {
                return _del(username, originalQuizName)
            }).then(result => {
                return _create(username, quizName, questionsData);
            }).then(result => {
                resolve(result);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
};

function _del(username, quizName) {
    console.log('Quiz delete', username, quizName);
    return new Promise((resolve, reject) => {
        _validateHasQuiz(username, quizName)
            .then(result => {
                return Question.deleteMany({ user: username, quizName });
            }).then(result => {
                return Quiz.deleteOne({ user: username, name: quizName });
            }).then(result => {
                return User.findOneAndUpdate({ username }, { $pull: { quizzes: quizName }});
            }).then(result => {
                resolve({ quizName });
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
};

function create(req, res) {
    _create(req.user.username, req.body.name, req.body.questions)
        .then(result => res.json(result))
        .catch(error => res.status(500).json({ error }));
}

function readList(req, res) {
    _readList(req.user.username, req.body.name, req.body.questions)
        .then(result => res.json(result))
        .catch(error => res.status(500).json({ error }));
}

function read(req, res) {
    _read(req.user.username, req.params.quizName)
        .then(result => res.json(result))
        .catch(error => res.status(500).json({ error }));
}

function edit(req, res) {
    _edit(req.user.username, req.params.quizName, req.body.name, req.body.questions)
        .then(result => res.json(result))
        .catch(error => res.status(500).json({ error }));
}

function del(req, res) {
    _del(req.user.username, req.params.quizName)
        .then(result => res.json(result))
        .catch(error => res.status(500).json({ error }));
}

module.exports = {
    create,
    readList,
    read,
    edit,
    del,
};
