const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
// import { v4 as uuidv4 } from "uuid";

const RoomSchema = new Schema(
    {
        display_name: {
            type: String,
            required: false,
            trim: true,
            default: 'Hello World',
        },
        name: {
            type: String,
            required: false,
            trim: true,
            unique: true,
            default: () => uuidv4().replace(/\-/g, ""),
            // minlength: ['3', 'Room name should be greater than 3 characters'],
            // maxlength: ['20', 'Room name should be less than 20 characters']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        password: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'accept'
        },
        access: {
            type: Boolean,
            default: false
        },
        accessIds: {
            type: Array,
            default: []
        },
        agentId: {
            type: String,
            default: ''
        },
        users: [
            {
                _id: false,
                lookup: {
                    type: Schema.Types.ObjectId,
                    required: false,
                    ref: 'User'
                },
                socketId: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

RoomSchema.methods.isValidPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

RoomSchema.pre('save', function (next) {
    if (this.password !== '' && this.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, res) => {
                this.password = res;
                next();
            });
        });
    } else {
        next();
    }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = { Room };