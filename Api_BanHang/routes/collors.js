
var express = require('express');
var router = express.Router();
let Collor = require("./../controler/collor");
let collor = new Collor;
// lay tat ca collor
router.get('/', async (req, res, next) => {
    try {
        let data = await collor.all();
        return res.status(200).json({
            message: "found collor",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// lay collor theo id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await collor.search(req.params.id);
        return res.status(200).json({
            message: "found collor",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// sua collor theo id
router.put('/:id', async (req, res, next) => {
    try {
        const put = await collor.fix(req.params.id, req.body);
        let data = await collor.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
//them collor
router.post('/' ,async (req, res, next) => {
    try {
        const post = await collor.add(req.body);
        let data = await collor.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
});
//xoa collor
router.delete("/:id", async (req, res, next) => {
    try {
        const 
        Delete = await collor.delete(req.params.id);
        let data = await collor.all();
        return res.json({
            message: "sucsesstfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
})
module.exports = router;