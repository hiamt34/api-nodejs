class Size {
    constructor() {
        this.modelSize = require('../model/size.js');
    }
    all() {
        return this.modelSize.size.find();
    }
    search(id) {
        return this.modelSize.size.findById(id);
    }
    add(size) {
        var data = new this.modelSize.size(size);
        data.save();
    }
    fix(id, new_size) {
        return this.modelSize.size.findOneAndUpdate({
            _id: id
        }, new_size);
    }
    delete(id) {
        return this.modelSize.size.findByIdAndRemove(id).exec();
    }
}
module.exports = Size;