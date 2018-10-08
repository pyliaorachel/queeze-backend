const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // TODO: use crypto methods to add security
    quizzes: [{ type: String, ref: 'Quiz' }],
}, {
    timestamps: true, // assigns `createdAt` & `updatedAt` fields
});

// JSON web token for user authentication
UserSchema.methods.generateJwt = function() {
    return jwt.sign({
        _id: this._id,
        username: this.username,
    }, keys.secret, { expiresIn: '1h' });
}

module.exports = mongoose.model('User', UserSchema);
