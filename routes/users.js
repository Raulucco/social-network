const User = require('../models/User');
const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const {
    secret
} = require('../config/keys');

// @route POST api/users/register
// @desc register a new user
// @access Public
router.post('/register', (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(existingUser => {
        if (existingUser) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }

        const newUser = new User({
            ...req.body,
            avatar: gravatar.email(req.body.email, {
                s: 200,
                r: 'pg',
                d: 'mm'
            })
        });
        const password = bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.json(err);
            }
            bcrypt.hash(req.body.password, salt).then(hash => {
                newUser.password = hash;
                newUser.save().then(user => {
                    res.json(user);
                }).catch(err => {
                    res.json(err);
                });
            });
        });
    });
});

// @route POST /api/userrs/login
// desc Login user / returns JWT Token
// @access Public
router.post('/login', (req, res) => {
    const {
        email,
        password
    } = req.body;
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email
    }).then(user => {
        if (!user) {
            return res.status(403).json({
                email: 'Email not found'
            });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
                res.status(403).json({
                    password: 'Password doesnot match!'
                });
            }

            jwt.sign({
                id: user.id,
                name: user.name,
                avatar: user.avatar
            }, secret, {
                expiresIn: 3600
            }, (err, token) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.json({
                    token: `Bearer: ${token}`
                });
            });
        })
    });
});

// @route GET /api/users/current
// @desc Returns current user
// @access Private
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => res.json(req.user));

module.exports = router;