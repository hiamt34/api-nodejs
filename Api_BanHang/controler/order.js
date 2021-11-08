class Order {
    constructor() {
        this.modelOrder = require('../model/order.js');
    }
    all() {
        return this.modelOrder.order.find();
    }
    search(id) { 
        return this.modelOrder.order.findById(id);
    }
    add(order) {
        var data = new this.modelOrder.order(order);
        data.save();
    }
    fix(id, new_order) {
        return this.modelOrder.order.findOneAndUpdate({
            _id: id
        }, new_order);
    }
    delete(id) {
        return this.modelOrder.order.findByIdAndRemove(id).exec();
    }
}
module.exports = Order;