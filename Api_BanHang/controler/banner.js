const fs = require('fs');
class Banner {
    constructor() {
        this.modelBanner = require('../model/banner.js');
    }
    all() {
        return this.modelBanner.banner.find();
    }
    search(id) {
        return this.modelBanner.banner.findById(id);
    }
    add(banner) {
        
        var data = new this.modelBanner.banner(banner);
        data.save();
    }
    fix(id, new_banner) {
        return this.modelBanner.banner.findOneAndUpdate({
            _id: id
        }, new_banner);
    }
    delete (id) {
        return this.modelBanner.banner.findById(id).then((data)=>{
            var check = fs.existsSync(data.img);
            if(check){ fs.unlinkSync(data.img)}
        }).then(()=>this.modelBanner.banner.findByIdAndRemove(id).exec())
        
    }
}
module.exports = Banner;