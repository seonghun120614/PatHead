const mongoose = require('mongoose');
const { Schema } = mongoose;

const Written = new Schema({
    unique : {
        type:Number,
        required : true,
        unique : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    date : {
        type: Date,
        required : true
    }
})

module.exports = mongoose.model('Written', Written);