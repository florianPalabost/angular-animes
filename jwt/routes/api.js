const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
require('../config/passport')(passport);
const User = require('../models').User;

// endpoint  POST user registration
router.post('/signup', function(req, res) {
    console.log(req.body);
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send({msg: 'Please pass username, password and email.'})
    } else {
        User
            .create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    }
});

router.post('/signin', function(req, res) {
    console.log('slt');
    User
        .findOne({
            $or: [
                {
                    username: req.body.username
                },
                {
                    email: req.body.email
                }
            ]
        })
        .then((user) => {
            console.log('toto');
            if (!user) {
                return res.status(401).send({
                    message: 'Authentication failed. User not found.',
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(isMatch && !err) {
                    const token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
                    jwt.verify(token, 'nodeauthsecret', function(err, data){
                        console.log(err, data);
                    });
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            })
        })
        .catch((error) => res.status(400).send(error));
});


// todo move to helpFct.js
const getToken = function (headers) {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
