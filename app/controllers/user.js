const User = require('../models/user');
const errorUtils = require('../utils/error');

function login(req, res) {
    console.log('User login', req.body);

    User.findOne({ username: req.body.username, password: req.body.password })
        .then(data => {
            console.log(data);
            if (data) {
                const user = new User(data);
                token = user.generateJwt();
                res.send(token);
            } else
                res.status(401).send(errorUtils.LOGIN_FAIL);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

function create(req, res) {
    console.log('User create', req.body);

    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    user.save()
        .then(data => {
            console.log(data);
            token = user.generateJwt();
            res.send(token);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

module.exports = {
    login,
    create,
};
