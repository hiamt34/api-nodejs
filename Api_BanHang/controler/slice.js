const fs = require('fs');
class Slice {
    constructor() {
        this.modelSlice = require('../model/slice.js');
    }
    all() {
        return this.modelSlice.slice.find();
    }
    search(id) {
        return this.modelSlice.slice.findById(id);
    }
    add(slice) {
        
        var data = new this.modelSlice.slice(slice);
        data.save();
    }
    fix(id, new_slice) {
        return this.modelSlice.slice.findOneAndUpdate({
            _id: id
        }, new_slice);
    }
    delete (id) {
        return this.modelSlice.slice.findById(id).then((data)=>{
            if(data.img){ fs.unlinkSync(data.img)}
        }).then(()=>this.modelSlice.slice.findByIdAndRemove(id).exec())
        
    }
}
module.exports = Slice;