const mongoose = require('mongoose');
var banner = new mongoose.Schema({
    category:'string',
    img:'string'
});
module.exports.banner = mongoose.model('banner', banner);