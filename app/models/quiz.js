const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const QuizSchema = new Schema({
    name: { type: String, required: true },
    user: { type: String, ref: 'User' },
    questions: [{ type: ObjectId, ref: 'Question' }],
}, {
    timestamps: true, // assigns `createdAt` & `updatedAt` fields
});

// Compound primary key
QuizSchema.index({ name: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Quiz', QuizSchema);
