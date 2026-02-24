const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    appName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Credential', credentialSchema );