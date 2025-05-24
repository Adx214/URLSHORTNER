const mongoose = require('mongoose');
const conn = require('../config/db');

const user = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('user',user);