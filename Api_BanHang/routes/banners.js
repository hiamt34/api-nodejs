var express = require('express');
var router = express.Router();

let Banner = require("./../controler/banner");
let banner = new Banner;
var multer = require('multer');
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
// lay tat ca banner
router.get('/', async (req, res, next) => {
    try {
        let data = await banner.all();
        return res.status(200).json({
            message: "found banner",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// lay banner theo id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await banner.search(req.params.id);
        return res.status(200).json({
            message: "found banner",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// sua banner theo id
router.put('/:id', async (req, res, next) => {
    try {
        const put = await banner.fix(req.params.id, req.body);
        let data = await banner.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
//them banner
router.post('/',upload.single("file") ,async (req, res, next) => {    

    try {
        if(!req.file){
            var path=null
        }else{
            var path=req.file.path
        }
        var BANNER={
            "category":req.body.category,
            "img":path
        }
        const post = await banner.add(BANNER);
        let data = await banner.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
});
//xoa banner
router.delete("/:id", async (req, res, next) => {
    try {
        const Delete = await banner.delete(req.params.id);
        let data = await banner.all();
        return res.json({
            message: "sucsesstfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
})
module.exports = router;