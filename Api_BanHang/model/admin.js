const mongoose = require('mongoose');
var admin = new mongoose.Schema({
        date:'string',
        name:'string',
        email:'string',
        pass:'string',
        phone:'string',
        author:'string',
});
module.exports.admin = mongoose.model('admin', admin);