const fs = require('fs');
class Category {
    constructor() {
        this.modelCategory = require('../model/category.js');
    }
    all() {
        return this.modelCategory.category.find();
    }
    search(id) {
        return this.modelCategory.category.findById(id);
    }
    add(category) {
        var data = new this.modelCategory.category(category);
        data.save();
    }
    fix(id, new_category) {
        return this.modelCategory.category.findById(id).then((data)=>{
            if(new_category.img && data.img){ fs.unlinkSync(data.img)}
        }).then(()=>this.modelCategory.category.findOneAndUpdate({
            _id: id
        }, new_category))
         
    }
    delete(id) {
        return this.modelCategory.category.findById(id).then((data)=>{
            if(data.img){ fs.unlinkSync(data.img)}
        }).then(()=>this.modelCategory.category.findByIdAndRemove(id).exec())
    }
}
module.exports = Category;