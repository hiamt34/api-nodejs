const mongoose = require('mongoose');
var blog = new mongoose.Schema({
    date:'string',
    title:'string',
    cmt:'array',
    view:'number',
    author:'string',
    description:'string',
    tags:'array',
    img:'string',
    rate:'number'
});
module.exports.blog = mongoose.model('blog', blog);