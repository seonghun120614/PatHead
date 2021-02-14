const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    unique : {
        type:Number,
        required : true,
        unique : true
    },
    user : {
        type : String,
        required : true,
        unique : true,
    },
    date : {
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User', User);