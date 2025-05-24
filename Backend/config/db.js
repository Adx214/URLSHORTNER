const mongoose = require('mongoose');
require('dotenv').config();
const conn = mongoose.connect(process.env.db_url).then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.log(err);
})
module.exports = conn;