const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    profilePicture: {
        type: String,
        default: ''
    },
    coverPicture: {
        type: String,
        default: ''
    },
    followers: {
        type:Array,
        default: [],
    },
    followings: {
        type:Array,
        default: [],
    },
    isAdmin: {
        type:Boolean,
        default: false
    }

},{ timestamp: true });

module.exports = mongoose.model('User', userSchema);