var express = require('express');
var router = express.Router();
let Tag = require("./../controler/tag");
let tag = new Tag;
// lay tat ca tag
router.get('/', async (req, res, next) => {
    try {
        let data = await tag.all();
        return res.status(200).json({
            message: "found tag",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// lay tag theo id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await tag.search(req.params.id);
        return res.status(200).json({
            message: "found tag",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// sua tag theo id
router.put('/:id', async (req, res, next) => {
    try {
        const put = await tag.fix(req.params.id, req.body);
        const data = await tag.all();
        return res.json({
            message: "sucsessfuly",
            payload:data
        });
    } catch (er) {
        next(er);
    }
});
//them tag
router.post('/' ,async (req, res, next) => {
    try {
        const add = await tag.add(req.body);
        const data = await tag.all();
        return res.json({
            message: "sucsessfuly",
            payload:data
        })
    } catch (er) {
        next(er);
    }
});
//xoa tag
router.delete("/:id", async (req, res, next) => {
    try {
        const Delete = await tag.delete(req.params.id);
        const data = await tag.all()
        return res.status(200).json({
            message: "sucsesstfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
})
module.exports = router;