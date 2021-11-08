const mongoose = require('mongoose');
var tag = new mongoose.Schema({
    name:'string',
});
module.exports.tag = mongoose.model('tag', tag);