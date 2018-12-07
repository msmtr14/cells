const mongoose = require('mongoose');

const bodySchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
});

const Body = mongoose.model('Body',bodySchema);

module.exports = { Body }
