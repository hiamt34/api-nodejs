const mongoose = require('mongoose');
var size = new mongoose.Schema({
    name:'string',
});
module.exports.size = mongoose.model('size', size);