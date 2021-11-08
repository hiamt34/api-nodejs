var express = require('express');
var router = express.Router();

let Blog = require("./../controler/blog");
let blog = new Blog;
const multiparty = require('connect-multiparty');
const MultipartyMidderwear =multiparty({uploadDir:'./imgBlog'});
// let mutiparti = require("connect-multiparty")


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
// lay tat ca blog
router.get('/', async (req, res, next) => {
    let tag=req.query.tag
    try {
        let data = await blog.all();
        data= await data.reverse();
        if(tag){
            data = data.filter(item=>item.tags.includes(tag))
        }
        let length = await data.length; 
        return res.status(200).json({
            message: "found blog",
            payload: data,
            length:length
        });
    } catch (er) {
        next(er);
    }
});
// lay blog theo id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await blog.search(req.params.id);
        return res.status(200).json({
            message: "found blog",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// sua blog theo id
router.put('/:id', async (req, res, next) => {
    try {
        const put = await blog.fix(req.params.id, req.body);
        let data = await blog.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
//them blog
router.post('/' ,async (req, res, next) => {    
    try {     
        const post = await blog.add(req.body);
        let data = await blog.all();
        return res.json({
            message: "sucsessfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
});
//xoa blog
router.delete("/:id", async (req, res, next) => {
    try {
        const Delete = await blog.delete(req.params.id);
        let data = await blog.all();
        return res.json({
            message: "sucsesstfuly",
            payload: data
        })
    } catch (er) {
        next(er);
    }
})



router.post('/upload',MultipartyMidderwear, async (req, res, next) => {
    console.log(req.files);
    return res.status(200).json({
        uploaded:true,
        url:`${req.files.upload.path}`
    })
});
router.post('/uploadimg',upload.single("file"), async (req, res, next) => {
    return res.json({
        message:"successfuly",
        payload:req.file.path
    })
});
module.exports = router;