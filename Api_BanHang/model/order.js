const mongoose = require('mongoose');
var order = new mongoose.Schema({
        date:'string',
        name:'string',
        email:'string',
        userID:'string',
        phone:'string',
        adress:'array',
        cart:'array',
        node:'string',
        status:'string',
});
module.exports.order = mongoose.model('order', order);