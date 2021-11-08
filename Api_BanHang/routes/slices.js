var express = require('express');
var router = express.Router();

let Slice = require("./../controler/slice");
let slice = new Slice;
var multer = require('multer');

// var middlewareCache = require('./../cache/cache')
// chọn file để lưu ảnh
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './IMG')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({
    storage: storage
})
//end lưu ảnh
// lay tat ca slice
router.get('/' ,async (req, res, next) => {
    try {
        let data = await slice.all();
        return res.status(200).json({
            message: "found slice",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// lay slice theo id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await slice.search(req.params.id);
        return res.status(200).json({
            message: "found slice",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// sua slice theo id
router.put('/:id', async (req, res, next) => {
    try {
        const put = await slice.fix(req.params.id, req.body);
        let data = await slice.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
//them slice
router.post('/',upload.single("file") ,async (req, res, next) => {    

    try {
        if(!req.file){
            var path=null
        }else{
            var path=req.file.path
        }
        var SLICE={
            "img":path
        }
        const post = await slice.add(SLICE);
        let data = await slice.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
});
//xoa slice
router.delete("/:id", async (req, res, next) => {
    try {
        const Delete = await slice.delete(req.params.id);
        let data = await slice.all();
        return res.json({
            message: "sucsesstfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
})
module.exports = router;