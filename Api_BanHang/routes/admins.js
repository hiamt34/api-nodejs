var express = require('express');
var router = express.Router();
let middellware = require("./../middellware/auth");
let Admin = require("./../controler/admin");
let admin = new Admin;
// lay tat ca admin
router.get('/', async (req, res, next) => {
    try {
        let data = await admin.all();
        // let x = await data;   =====>   CÁCH DÙNG PROMISS
        // console.log(x);
        return res.status(200).json({
            message: "found admin",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// lay admin theo id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await admin.search(req.params.id);
        return res.status(200).json({
            message: "found admin",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// sua admin theo id
router.put('/:id',middellware.register_Admin, async (req, res, next) => {
    try {
        const data = await admin.fix(req.params.id, req.body);
        return res.json({
            message: "sucsessfuly"
        });
    } catch (er) {
        next(er);
    }
});
//them admin
router.post('/',middellware.register_Admin ,async (req, res, next) => {
    try {
        const data = await admin.add(req.body);
        return res.json({
            message: "sucsessfuly",
        })
    } catch (er) {
        next(er);
    }
});
//xoa admin
router.delete("/:id", async (req, res, next) => {
    try {
        const data = await admin.delete(req.params.id);
        return res.json({
            message: "sucsesstfuly"
        })
    } catch (er) {
        next(er);
    }
})
module.exports = router;