class Tag {
    constructor() {
        this.modelTag = require('../model/tag.js');
    }
    all() {
        return this.modelTag.tag.find();
    }
    search(id) {
        return this.modelTag.tag.findById(id);
    }
    add(tag) {
        var data = new this.modelTag.tag(tag);
        data.save();
    }
    fix(id, new_tag) {
        return this.modelTag.tag.findOneAndUpdate({
            _id: id
        }, new_tag);
    }
    delete(id) {
        return this.modelTag.tag.findByIdAndRemove(id).exec();
    }
}
module.exports = Tag;