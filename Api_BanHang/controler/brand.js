const fs = require('fs');
class Brand {
    constructor() {
        this.modelBrand = require('../model/brand.js');
    }
    all() {
        return this.modelBrand.brand.find();
    }
    search(id) {
        return this.modelBrand.brand.findById(id);
    }
    add(brand) {

        var data = new this.modelBrand.brand(brand);
        data.save();
    }
    fix(id, new_brand) {
        return this.modelBrand.brand.findOneAndUpdate({
            _id: id
        }, new_brand);
    }
    delete(id) {
        return this.modelBrand.brand.findById(id).then((data) => {
            var check = fs.existsSync(data.img);
            if (check) { fs.unlinkSync(data.img) }
        }).then(() => this.modelBrand.brand.findByIdAndRemove(id).exec())

    }
}
module.exports = Brand;