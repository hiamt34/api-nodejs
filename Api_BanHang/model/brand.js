const mongoose = require('mongoose');
var brand = new mongoose.Schema({
    name:'string',
    img:'string'
});
module.exports.brand = mongoose.model('brand', brand);