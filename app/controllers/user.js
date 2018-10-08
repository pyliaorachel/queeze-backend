const User = require('../models/user');
const errorUtils = require('../utils/error');

/* Validation helper functions */

function _validateNoUser(username) {
    return new Promise((resolve, reject) => {
        User.count({ username })
            .then(cnt => {
                if (cnt > 0)
                    reject('Username taken.');
                else
                    resolve();
            }).catch(err => {
                reject(err);
            }); 
    });
}

/* Auth */

function login(req, res) {
    console.log('User login', req.body);

    User.findOne({ username: req.body.username, password: req.body.password })
        .then(data => {
            if (data) {
                const user = new User(data);
                token = user.generateJwt();
                res.json({ token });
            } else
                res.status(401).json({ error: errorUtils.LOGIN_FAIL });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

function create(req, res) {
    console.log('User create', req.body);

    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    _validateNoUser(req.body.username)
        .then(result => {
            return user.save();
        }).then(data => {
            token = user.generateJwt();
            res.json({ token });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

module.exports = {
    login,
    create,
};
