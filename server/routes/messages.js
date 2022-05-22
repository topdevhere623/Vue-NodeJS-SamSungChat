const express = require('express');
const router = express.Router();

const passport = require('passport');

const { Message } = require('../models/Message');

const { createErrorObject } = require('../middleware/authenticate');

/**
 * @description GET /api/messages/:room_id
 */
router.get('/:room_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const messages = await Message.find({ room: req.params.room_id });

    if (messages) {
        return res.status(200).json(messages);
    } else {
        return res.status(404).json({ error: 'No messages found' });
    }
});

router.get('/unreadMessages/list', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const messages = await Message.find({ status: false });

    if (messages) {
        return res.status(200).json(messages);
    } else {
        return res.status(404).json({ error: 'No messages found' });
    }
});

router.post('/quickCheck', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const messages = await Message.find({ content: req.body.content, room: req.body.room_id });

    if (messages) {
        return res.status(200).json(messages.length);
    } else {
        return res.status(404).json({ error: 'No messages found' });
    }
});


router.delete('/delete/:room_id', async (req, res) => {
    const messages = await Message.deleteMany({ room: req.params.room_id });

    if (messages) {
        return res.status(200).json(messages);
    } else {
        return res.status(404).json({ error: 'No messages found' });
    }
});

router.put('/changeStatus/:room_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const messages = await Message.updateMany({ room: req.params.room_id }, { $set: { "status": true } });

        if (messages) {
            return res.status(200).json(messages);

        } else {
            return res.status(404).json({ error: 'No messages found' });
        }
    } catch (err) {
        return res.status(404).json(err);
    }
});

// router.delete('/delete/:room_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     try {
//         const room = await Room.findByIdAndDelete(req.params.room_id)
//             .populate('user', ['username'])
//             .select('-password')
//             .lean();
//         if (room) {
//             return res.status(200).json(room);
//         } else {
//             return res.status(404).json({
//                 errors: `No room with name ${req.params.room_id} found, You will now be redirected`
//             });
//         }
//     } catch (err) {
//         return res.status(404).json(err);
//     }
// });

/**
 * @description POST /api/messages/
 */
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let errors = [];

    if (!req.body.content) {
        errors.push({ param: 'no_content', msg: 'Message cannot be empty' });
        return res.json({ errors: createErrorObject(errors) });
    }

    const newMessage = new Message({
        content: req.body.content,
        admin: req.body.admin ? true : false,
        user: req.user.id,
        room: req.body.roomId
    }).save();

    return res.status(200).json(newMessage);
});

module.exports = router;