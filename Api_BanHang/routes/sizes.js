var express = require('express');
var router = express.Router();
let Size = require("./../controler/size");
let size = new Size;
// lay tat ca size
router.get('/', async (req, res, next) => {
    try {
        let data = await size.all();
        return res.status(200).json({
            message: "found size",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// lay size theo id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await size.search(req.params.id);
        return res.status(200).json({
            message: "found size",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// sua size theo id
router.put('/:id', async (req, res, next) => {
    try {
        const put = await size.fix(req.params.id, req.body);
        const data = await size.all();
        return res.json({
            message: "sucsessfuly",
            payload:data
        });
    } catch (er) {
        next(er);
    }
});
//them size
router.post('/' ,async (req, res, next) => {
    try {
        const add = await size.add(req.body);
        const data = await size.all();
        return res.json({
            message: "sucsessfuly",
            payload:data
        })
    } catch (er) {
        next(er);
    }
});
//xoa size
router.delete("/:id", async (req, res, next) => {
    try {
        const Delete = await size.delete(req.params.id);
        const data = await size.all()
        return res.status(200).json({
            message: "sucsesstfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
})
module.exports = router;