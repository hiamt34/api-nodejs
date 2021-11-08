var express = require('express');
var router = express.Router();

let Brand = require("./../controler/brand");
let brand = new Brand;
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
// lay tat ca brand
router.get('/', async (req, res, next) => {
    try {
        let data = await brand.all(); 
        return res.status(200).json({
            message: "found brand",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// lay brand theo id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await brand.search(req.params.id);
        return res.status(200).json({
            message: "found brand",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// sua brand theo id
router.put('/:id', async (req, res, next) => {
    try {
        const put = await brand.fix(req.params.id, req.body);
        let data = await brand.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
//them brand
router.post('/',upload.single("file") ,async (req, res, next) => {    

    try {
        if(!req.file){
            var path=null
        }else{
            var path=req.file.path
        }
        var BRAND={
            "name":req.body.name,
            "img":path
        }
        const post = await brand.add(BRAND);
        let data = await brand.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
});
//xoa brand
router.delete("/:id", async (req, res, next) => {
    try {
        const Delete = await brand.delete(req.params.id);
        let data = await brand.all();
        return res.json({
            message: "sucsesstfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
})
module.exports = router;