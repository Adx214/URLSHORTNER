const mongoose = require('mongoose');
const conn = require('../config/db');

const url = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    shortenurl:{
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})
module.exports = mongoose.model('url',url);
