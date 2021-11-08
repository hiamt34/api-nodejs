const mongoose = require('mongoose');
var item = new mongoose.Schema({
        date:'string',
        title:'string',
        rate:'number',
        price_old:'number',
        price_new:'number',
        sale:'number',
        status:'string',
        imgs:'array',
        description:'string',
        size:'array',
        collor:'array',
        quantity:'number',
        brand:'string',
        category:'string',
        cmt:'array',
        sell:'number'
});
module.exports.item = mongoose.model('item', item);

