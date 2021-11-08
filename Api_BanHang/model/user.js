const mongoose = require('mongoose');
var user = new mongoose.Schema({
        date:'string',
        name:'string',
        email:'string',
        password:'string',
        phone:'string',
        wishlist:'array',
        order:'array'
});
module.exports.user = mongoose.model('user', user);