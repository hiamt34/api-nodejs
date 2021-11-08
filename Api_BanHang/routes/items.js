var express = require('express');
var router = express.Router();
let ItemStore = require("./../controler/item");
let itemstore = new ItemStore;
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
//phan trang
paginate = (data,size,page)=>{
    let index = page -1;
    return data.slice(size*index,size*(index+1));
}
// lay tat ca item
router.get('/', async (req, res, next) => {
    let title = req.query.title  ;
    let page = req.query.page || 1;
    let size = req.query.size ||10;//10
    let seller = req.query.seller ||0;
    let sale = req.query.sale ||0;
    let hot = req.query.hot ||0;
    let rate = req.query.rate ||0;
    let sortprice = req.query.sortprice ||0;
    let category = req.query.category ;
    let brand = req.query.brand ;
    let color = req.query.color ;
    try {

        let data = await itemstore.all()
        data= await data.reverse();
        let FistLength = await data.length
        if(req.query.title){
            data = await data.filter(item => item.title.toLowerCase().includes(title))
        }
        if(category){
            data = await data.filter(item => item.category==category)
        }
        if(brand){
            data = await data.filter(item => item.brand==brand)
        }
        if(color){
            data = await data.filter(item => item.collor.includes(color))
        }
        if(seller==1){
            await data.sort(function(a, b) {
                return b.cmt.length - a.cmt.length;
            });
        }
        if(sale==1){
            await data.sort(function(a, b) {
                return b.sale - a.sale;
            });
        }
        if(rate==1){
            await data.sort(function(a, b) {
                return b.rate - a.rate;
            });
        }
        if(sortprice==1){
            await data.sort(function(a, b) {
                return b.price_new - a.price_new;
            });
        }
        if(sortprice==2){
            await data.sort(function(a, b) {
                return a.price_new - b.price_new;
            });
        }
        if(hot==1){
            data = await data.filter(item => item.status=="HOT")
        }
        let LastLength = await data.length
        let resut = await paginate(data,size,page);
        
        return res.json({
            message: "found items",
            payload: resut,
            length:FistLength,
            page:page,
            LastLength:LastLength
        });
    } catch (er) {
        next(er);
    }
});
// lay item theo id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await itemstore.search(req.params.id);
        return res.json({
            message: "found item",
            payload: data
        });
    } catch (er) {
        next(er);
    }
});
// sua item theo id
router.put('/:id', async (req, res, next) => {
        let title = req.query.title || "" ;
        let page = req.query.page || 1;
        let size = req.query.size ||10;
        imgs=[]
        // console.log(req);
    try {
        const put = await itemstore.fix(req.params.id, req.body)
        
        let data = await itemstore.all();
        data= await data.reverse();
        let length = await data.length
        data =await data.filter(item => item.title.includes(title))
        let resut =await paginate(data,size,page);
        return res.json({
            message: "sucsessfuly",
            payload:resut,
            length:length,
            page:page,

        });
    } catch (er) {
        // console.log(er);
        next(er);
    }
});
//upload
let imgs=[];
router.post('/upload',upload.single("files"), async (req, res, next) => {
    imgs.push(req.file.path)
    return res.json({
        message: "sucsessfuly",
        imgs:imgs
    })
});
//them item
router.post('/', async (req, res, next) => {
    try { 
        const post = await itemstore.add(req.body);
        let data = await itemstore.all();
        data= await data.reverse();
        let length = await data.length
        let resut =await data.slice(0,10)
        imgs=[]
        return res.json({
            message: "sucsessfuly",
            payload:resut,
            length:length,

        })
    } catch (er) {
        console.log(er);
        next(er);
    }

});
//xoa item
router.delete("/:id", async (req, res, next) => {
    let title = req.query.title || "" ;
    let page = req.query.page || 1;
    let size = req.query.size ||10;
    try {
        const Delete = await itemstore.delete(req.params.id);
        let data = await itemstore.all();
        data= await data.reverse();
        let length = await data.length
        data = data.filter(item => item.title.includes(title))
        let resut = paginate(data,size,page);
        return res.json({
            message: "sucsesstfuly",
            payload: resut,
            length:length,
            page:page
        })
    } catch (er) {
        next(er);
    }
})

module.exports = router;