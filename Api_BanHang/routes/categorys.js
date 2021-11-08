var express = require('express');
var router = express.Router();
let Category = require("./../controler/category");
let category = new Category;
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
// lay tat ca category
router.get('/', async (req, res, next) => {
    try {
        let data = await category.all();
        return res.status(200).json({
            message: "found category",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// lay category theo id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await category.search(req.params.id);
        return res.status(200).json({
            message: "found category",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// sua category theo id
router.put('/:id',upload.single("file"), async (req, res, next) => {
    try {
        console.log(req.body);
        if(!req.file){
            var CATEGORY={
                "name":req.body.name,

            }
        }else{
            var path=req.file.path
            var CATEGORY={
                "name":req.body.name,
                "img":path,

            }
        }
        const put = await category.fix(req.params.id, CATEGORY);
        let data = await category.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
//them category
router.post('/',upload.single("file") ,async (req, res, next) => {
    try {
        if(!req.file){
            var path=null
        }else{
            var path=req.file.path
        }
        var CATEGORY={
            "name":req.body.name,
            "img":path,
            "honme":null
        }
        const post = await category.add(CATEGORY);
        let data = await category.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
});
//xoa category
router.delete("/:id", async (req, res, next) => {
    try {
        const Delete = await category.delete(req.params.id);
        let data = await category.all();
        return res.json({
            message: "sucsesstfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
})
module.exports = router;