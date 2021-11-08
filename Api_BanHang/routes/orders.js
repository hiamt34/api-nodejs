
var express = require('express');
var router = express.Router();
let Order = require("./../controler/order");
let order = new Order;
// lay tat ca order
router.get('/', async (req, res, next) => {
    try {
        let data = await order.all();
        return res.status(200).json({
            message: "found order",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// lay order theo id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await order.search(req.params.id);
        return res.status(200).json({
            message: "found order",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// sua order theo id
router.put('/:id', async (req, res, next) => {
    try {
        const put = await order.fix(req.params.id, req.body);
        let data = await order.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
//them order
router.post('/' ,async (req, res, next) => {
    try {
        const post = await order.add(req.body);
        let data = await order.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
});
//xoa order
router.delete("/:id", async (req, res, next) => {
    try {
        const 
        Delete = await order.delete(req.params.id);
        let data = await order.all();
        return res.json({
            message: "sucsesstfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
})
module.exports = router;