const mongoose = require('mongoose');
var slice = new mongoose.Schema({
    img:'string'
});
module.exports.slice = mongoose.model('slice', slice);