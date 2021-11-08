class Admin {
    constructor() {
        this.modelAdmin = require('../model/admin.js');
    }
    all() {
        return this.modelAdmin.admin.find();
    }
    search(id) {
        return this.modelAdmin.admin.findById(id);
    }
    add(admin) {
        var data = new this.modelAdmin.admin(admin);
        data.save();
    }
    fix(id, new_admin) {
        return this.modelAdmin.admin.findOneAndUpdate({
            _id: id
        }, new_admin);
    }
    delete(id) {
        return this.modelAdmin.admin.findByIdAndRemove(id).exec();
    }
}
module.exports = Admin;