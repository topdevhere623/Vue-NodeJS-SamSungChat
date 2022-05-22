const _ = require('lodash');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const gravatar = require('gravatar');

/** Middleware */
const {
    checkRegistrationFields,
    checkLoginFields,
    createErrorObject,
    customSocialAuthenticate
} = require('../middleware/authenticate');

// const USER_TYPES = {
//     CONSUMER: "consumer",
//     SUPPORT: "support",
//   };

/**
 * @description  POST /register
 * @param  {} [checkRegistrationFields]
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post('/register', [checkRegistrationFields], (req, res) => {
    let errors = [];

    User.findOne({ username: req.body.username }).then(user => {
        // if (user) {
        //     errors.push({ param: 'username', msg: 'Know ID is already taken' });
        //     res.send({
        //         errors: createErrorObject(errors)
        //     }).end();
        // } else {
        /** Assign Gravatar */
        const avatar = gravatar.url(req.body.username, {
            s: '220',
            r: 'pg',
            d: 'identicon'
        });

        const newUser = new User({
            handle: req.body.handle,
            username: req.body.username,
            type: req.body.type,
            email: req.body.email,
            image: avatar
        });

        newUser
            .save()
            .then(userData => {
                const user = _.omit(userData.toObject(), ['password']);

                const token = jwt.sign(user, process.env.JWT_SECRET, {
                    expiresIn: 18000
                });

                res.status(200).send({
                    auth: true,
                    token: `Bearer ${token}`,
                    user
                });
            })
            .catch(err => {
                res.send({
                    err,
                    error: 'Something went wrong, Please check the fields again'
                });
            });
        // }
    });
});

router.post('/agent/register', [checkRegistrationFields], (req, res) => {
    let errors = [];

    User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            errors.push({ param: 'username', msg: 'Know ID is already taken' });
            res.send({
                errors: createErrorObject(errors)
            }).end();
        } else {
            /** Assign Gravatar */
            const avatar = gravatar.url(req.body.username, {
                s: '220',
                r: 'pg',
                d: 'identicon'
            });

            const newUser = new User({
                username: req.body.username,
                type: req.body.type,
                password: req.body.password,
                image: avatar
            });

            newUser
                .save()
                .then(userData => {
                    const user = _.omit(userData.toObject(), ['password']);

                    const token = jwt.sign(user, process.env.JWT_SECRET, {
                        expiresIn: 18000
                    });

                    res.status(200).send({
                        auth: true,
                        token: `Bearer ${token}`,
                        user
                    });
                })
                .catch(err => {
                    res.send({
                        err,
                        error: 'Something went wrong, Please check the fields again'
                    });
                });
        }
    });
});

/**
 * @description POST /login
 * @param  {} checkLoginFields
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post('/login', checkLoginFields, async (req, res) => {
    const user = await User.findOne({ username: req.body.username }).select('-password');

    if (!user) {
        return res.status(404).send({
            error: 'No User Found'
        });
    }

    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: 18000 });

    res.status(200).send({ auth: true, token: `Bearer ${token}`, user });
});

/**
 * @description POST /logout
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post('/logout', async (req, res) => {
    const user = await User.findOne({ username: req.body.username }).select('-password');

    if (!user) {
        return res.status(404).send({
            error: 'No User Found'
        });
    }

    res.status(200).send({ success: true });
});

router.get('/username', async (req, res) => {
    // const messages = await Message.find({ room: req.params.room_id });

    if (username) {
        return res.status(200).json(username);
    } else {
        return res.status(404).json({ error: 'No username found' });
    }
});

module.exports = router;