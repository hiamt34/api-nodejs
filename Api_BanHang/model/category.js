const mongoose = require('mongoose');
var category = new mongoose.Schema({
    name:'string',
    img:'string',
    home:'string'
});
module.exports.category = mongoose.model('category', category);