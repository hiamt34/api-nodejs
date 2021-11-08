const mongoose = require('mongoose');
var collor = new mongoose.Schema({
    name:'string',
});
module.exports.collor = mongoose.model('collor', collor);