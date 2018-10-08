const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

function validateChoiceLimit(choices) {
    return choices != null && choices.length >= 2 && choices.length <= 10;
}

function validateAnswer(answer) {
    choices = this.choices;
    return answer >= 0 && answer < choices.length;
}

const QuestionSchema = new Schema({
    user: { type: String, required: true, ref: 'User' },
    quizName: { type: String, required: true, ref: 'Quiz' },
    text: { type: String, required: true },
    choices: { type: [String], required: true, validate: validateChoiceLimit},
    answer: { type: Number, required: true, validate: validateAnswer},
});

module.exports = mongoose.model('Question', QuestionSchema);
