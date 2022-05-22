/** Dotenv Environment Variables */
if (process.env.HEROKU_DEPLOYMENT !== 'true') {
    // Skip loading the .env file if deploying with heroku
    require('dotenv').config();
}

/** Connect to MongoDB */
const mongoose = require('mongoose');
require('./db/mongoose');

/** Built In Node Dependencies */
const path = require('path');
const fs = require('fs');

/** Logging Dependencies */
const morgan = require('morgan');
const winston = require('winston');
const { logger } = require('./config/logModule');

/** Passport Configuration */
const passport = require('passport');
require('./config/passport')(passport);

/** Express */
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const helmet = require('helmet');
const enforce = require('express-sslify');
const compression = require('compression');


/** Socket IO */
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:8080", "https://localhost:8080"],
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});


const {
    ADD_MESSAGE,
    UPDATE_ROOM_USERS,
    GET_ROOMS,
    GET_ROOM_USERS,
    FILTER_ROOM_USERS,
    CREATE_MESSAGE_CONTENT
} = require('./actions/socketio');

const { JOIN_ROOM } = require('./helpers/socketEvents');

/** Routes */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const roomRoutes = require('./routes/room');
const messageRoutes = require('./routes/messages');

app.use(cors());
/** Middleware */
app.use(
    morgan('combined', {
        stream: fs.createWriteStream('logs/access.log', { flags: 'a' })
    })
);
app.use(morgan('dev'));

if (process.env.HEROKU_DEPLOYMENT === 'true') {
    /** Trust Proto Header for heroku */
    app.enable('trust proxy');
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(expressValidator());

app.set('io', io);

/** Routes Definitions */
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

let userTypings = {};

/** Socket IO Connections */
io.on('connection', socket => {
    let currentRoomId = null;

    /** Socket Events */
    socket.on('disconnect', async () => {
        logger.info('User Disconnected');

        if (currentRoomId) {
            /** Filter through users and remove user from user list in that room */
            const roomState = await FILTER_ROOM_USERS({
                roomId: currentRoomId,
                socketId: socket.id
            });

            socket.broadcast.to(currentRoomId).emit(
                'updateUserList',
                JSON.stringify(
                    await GET_ROOM_USERS({
                        room: {
                            _id: mongoose.Types.ObjectId(currentRoomId)
                        }
                    })
                )
            );

            socket.broadcast.emit(
                'updateRooms',
                JSON.stringify({
                    room: await GET_ROOMS()
                })
            );

            socket.broadcast.to(currentRoomId).emit(
                'receivedNewMessage',
                JSON.stringify(
                    await ADD_MESSAGE({
                        room: { _id: roomState.previous._id },
                        user: null,
                        content: CREATE_MESSAGE_CONTENT(roomState, socket.id),
                        admin: true
                    })
                )
            );
        }
    });

    /** Join User in Room */
    socket.on('userJoined', data => {
        currentRoomId = data.room._id;
        data.socketId = socket.id;
        JOIN_ROOM(socket, data);
    });

    socket.on('userAccepted', async data => {
        data.socketId = socket.id;
        const newMessage = await ADD_MESSAGE(data);
        io.to(data.room._id).emit('receivedNewMessage', JSON.stringify(newMessage));
        JOIN_ROOM(socket, data);
    });

    /** User Exit Room */
    socket.on('exitRoom', data => {
        currentRoomId = null;
        socket.leave(data.room._id, async () => {
            socket.to(data.room._id).emit(
                'updateRoomData',
                JSON.stringify({
                    room: data.room
                })
            );

            /** Update room list count */
            socket.broadcast.emit(
                'updateRooms',
                JSON.stringify({
                    room: await GET_ROOMS()
                })
            );

            io.to(data.room._id).emit('receivedUserExit', data.room);

            /** Send Exit Message back to room */
            socket.broadcast
                .to(data.room._id)
                .emit('receivedNewMessage', JSON.stringify(await ADD_MESSAGE(data)));
        });
    });

    /** User Typing Events */
    socket.on('agentTyping', data => {
        if (data.room) {
            if (!userTypings[data.room._id]) {
                userTypings[data.room._id] = [];
            } else {
                if (!userTypings[data.room._id].includes(data.room.display_name)) {
                    userTypings[data.room._id].push(data.room.display_name);
                }
            }

            io.to(data.room._id).emit('receivedAgentTyping', JSON.stringify(userTypings[data.room._id]));
        }
    });

    socket.on('userTyping', data => {
        if (data.room) {
            if (!userTypings[data.room._id]) {
                userTypings[data.room._id] = [];
            } else {
                if (!userTypings[data.room._id].includes(data.user.username)) {
                    userTypings[data.room._id].push(data.user.username);
                }
            }

            io.to(data.room._id).emit('receivedUserTyping', JSON.stringify(userTypings[data.room._id]));
        }
    });

    socket.on('userChattingStatus', data => {
        if (data.room) {
            // Emit data back to the client for display
            io.to(data.room._id).emit('getUserChattingStatus', JSON.stringify(data.room.display_name));
        }
    });

    socket.on('userTypingDefault', data => {
        if (data.room) {
            if (!userTypings[data.room._id]) {
                userTypings[data.room._id] = [];
            } else {
                if (!userTypings[data.room._id].includes(data.user.username)) {
                    userTypings[data.room._id].push(data.user.username);
                }
            }

            socket.broadcast
                .to(data.room._id)
                .emit('receivedUserTyping', JSON.stringify([]));
        }
    });

    socket.on('removeUserTyping', data => {
        if (data.room) {
            if (userTypings[data.room._id]) {
                if (userTypings[data.room._id].includes(data.user.username)) {
                    userTypings[data.room._id] = userTypings[data.room._id].filter(
                        handle => handle !== data.user.username
                    );
                }
            }

            io.to(data.room._id).emit('receivedUserNotTyping', JSON.stringify(userTypings[data.room._id]));
        }
    });

    /** New Message Event */
    socket.on('newMessage', async data => {
        console.log("Ending the chatting$$$$$", data);
        const newMessage = await ADD_MESSAGE(data);

        // Emit data back to the client for display
        if (data.room) {
            io.to(data.room._id).emit('receivedNewMessage', JSON.stringify(newMessage));
        } else {
            io.to(data.agentRoom._id).emit('receivedNewMessage', JSON.stringify(newMessage));
        }
    });

    socket.on('changeRoomStatus', async data => {
        if (data.room) {
            io.emit('changedRoomStatus', JSON.stringify(data.room));
        }
    });

    socket.on('userRestartedChatting', async data => {
        if (data.room) {
            const newMessage = await ADD_MESSAGE(data);
            console.log("newMessage", newMessage);

            io.to(data.room._id).emit('receivedUserRestartedChatting', JSON.stringify(data));
        }
    });

    /** Room Deleted Event */
    socket.on('roomDeleted', async data => {
        if (data.room) {
            io.to(data.room._id).emit('receivedNewMessage', JSON.stringify(data));
            io.to(data.room._id).emit('roomDeleted', JSON.stringify(data));
            io.emit('roomListUpdated', JSON.stringify(data));
        }
    });

    /** Room Added Event */
    socket.on('roomAdded', async data => {
        if (data) {
            io.emit('roomAdded', JSON.stringify(data));
        }
    });

    socket.on('roomWasDeleted', async data => {
        socket.broadcast
            .emit('roomHasDeleted', JSON.stringify(data));
        // io.emit('roomWasDeleted', JSON.stringify(data));
    });


    /** Room Updated Event */
    socket.on('roomUpdateEvent', async data => {
        if (data.room) {
            io.in(data.room._id).emit('roomUpdated', JSON.stringify(data));
            io.emit('roomNameUpdated', JSON.stringify(data));
        }
    });

    /** Reconnected: Update Reconnected User in Room */
    socket.on('reconnectUser', data => {
        if (data.room) {
            currentRoomId = data.room._id;
            data.socketId = socket.id;
            if (socket.request.headers.referer.split('/').includes('room')) {
                socket.join(currentRoomId, async () => {
                    socket.emit('reconnected');
                    await UPDATE_ROOM_USERS(data);
                });
            }
        }

    });
});

/** Serve static assets if production */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
}

if (process.env.NODE_ENV !== 'test') {
    server.listen(process.env.PORT || 6000, () => {
        logger.info(`[LOG=SERVER] Server started on port ${process.env.PORT}`);
    });
}

module.exports = { app };