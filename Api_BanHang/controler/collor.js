class Collor {
    constructor() {
        this.modelCollor = require('../model/collor.js');
    }
    all() {
        return this.modelCollor.collor.find();
    }
    search(id) {
        return this.modelCollor.collor.findById(id);
    }
    add(collor) {
        var data = new this.modelCollor.collor(collor);
        data.save();
    }
    fix(id, new_collor) {
        return this.modelCollor.collor.findOneAndUpdate({
            _id: id
        }, new_collor);
    }
    delete(id) {
        return this.modelCollor.collor.findByIdAndRemove(id).exec();
    }
}
module.exports = Collor;