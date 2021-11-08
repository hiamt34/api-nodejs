const fs = require('fs');
class Blog {
    constructor() {
        this.modelBlog = require('../model/blog.js');
    }
    all() {
        return this.modelBlog.blog.find();
    }
    search(id) {
        return this.modelBlog.blog.findById(id);
    }
    add(blog) {
        
        var data = new this.modelBlog.blog(blog);
        data.save();
    }
    fix(id, new_blog) {
        return this.modelBlog.blog.findById(id).then((data)=>{
            var check = fs.existsSync(data.img);
            if(check && data.img!=new_blog.img){ fs.unlinkSync(data.img)}
        }).then(()=>this.modelBlog.blog.findOneAndUpdate({
            _id: id
        }, new_blog))
    }
    delete (id) {
        return this.modelBlog.blog.findById(id).then((data)=>{
            if(data.img){ fs.unlinkSync(data.img)}
        }).then(()=>this.modelBlog.blog.findByIdAndRemove(id).exec())
        
    }
}
module.exports = Blog;