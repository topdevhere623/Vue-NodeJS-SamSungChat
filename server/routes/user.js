const express = require('express');
const router = express.Router();

const passport = require('passport');

const { User } = require('../models/User');

const { checkEditProfileFields } = require('../middleware/authenticate');

/**
 * @description  GET /api/user/users
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 * @access private
 */

router.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const users = await User.find({}, 'image email username location').exec();

    if (users) {
        return res
            .status(200)
            .json(users)
            .end();
    } else {
        return res.status(404).json({ error: 'No Users Found' });
    }
});

/**
 * @description PUT /api/user/current
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.put(
    '/current',
    [passport.authenticate('jwt', { session: false }), checkEditProfileFields],
    async (req, res) => {
        const updateFields = {};

        for (let key of Object.keys(req.body)) {
            if (req.body[key] !== null) {
                updateFields[key] = req.body[key];
            }
        }

        User.findOneAndUpdate({ _id: req.user.id }, { $set: updateFields }, { new: true })
            .select('-password')
            .then(doc => res.json({ success: true, user: doc }))
            .catch(err => res.json({ error: err }));
    }
);

/**
 * @description GET api/user/current
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

/**
 * @description DELETE api/user/current
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.delete('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
    /** Delete the user */
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ success: true });
});

router.put('/changeRoomStatus', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.body.userData._id }, { $set: { "room_id": req.body.currentRoomId } });

        if (user) {
            return res.status(200).json(user);

        } else {
            return res.status(404).json({ error: 'No messages found' });
        }
    } catch (err) {
        return res.status(404).json(err);
    }
});

router.get('/getChattingUser/:user_name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.findOne({ username: req.params.user_name });

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(404).json({ error: `No User with name ${req.params.user_name} found` });
    }
});

router.put('/changeUserStatus/:user_name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ username: req.params.user_name }, { $set: { "chatting": true } });

        if (user) {
            return res.status(200).json(user);

        } else {
            return res.status(404).json({ error: 'No messages found' });
        }
    } catch (err) {
        return res.status(404).json(err);
    }
});

router.delete('/delete/:user_name', async (req, res) => {
    const user = await User.findOneAndDelete({ username: req.params.user_name });

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(404).json({
            errors: `No user with name ${req.params.user_name} found, You will now be redirected`
        });
    }
});

module.exports = router;