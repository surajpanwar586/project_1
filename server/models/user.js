const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // This ensures no two users can have the same email
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;