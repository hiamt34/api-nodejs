var express = require('express');
var router = express.Router();
let middellware = require("./../middellware/auth")
var md5 = require('md5')
let User = require("./../controler/user");
let user = new User;
//lay tat ca user
router.get('/', async (req, res, next) => {
  try {
    let data = await user.all();
    return res.json({
      message: "found users",
      payload: data
    });
  } catch (er) {
    next(er);
  }
});
// dang nhap
router.post('/login',middellware.register_Login, async (req, res, next) => {
  try {
    return res.json({
      message: "found users",
    });
  } catch (er) {
    next(er);
  }
});
// lay user theo id
router.get('/:id', async (req, res, next) => {
  try {
    const data = await user.search(req.params.id);
    return res.json({
      message: "found user",
      payload: data
    });
  } catch (er) {
    next(er);
  }
});
// sua pass theo id
router.put('/:id',middellware.change_Password ,async (req, res, next) => {
  try {
    console.log(req.body);
    var change={
      "password":md5(req.body.password_new1)
    }
    const data = await user.fix(req.params.id, change);
    const User = await user.search(req.params.id);
    return res.json({
      message: "sucsessfuly",
      payload:User
    });
  } catch (er) {
    next(er);
  }
});
//sửa wisstlist
router.put('/wishlist/:id',async (req, res, next) => {
  try {
    console.log(req.body);

    const data = await user.fix(req.params.id, req.body);
    const User = await user.search(req.params.id);
    return res.json({
      message: "sucsessfuly",
      payload:User
    });
  } catch (er) {
    next(er);
  }
});
//dang ký user
router.post('/register',middellware.register_User, async (req, res, next) => {
  try {
    var body={
      email:req.body.email,
      password:md5(req.body.password)
    }
    const data = await user.add(body);
    await res.cookie('userEmail',req.body.email,{
      signed:true
    })
    return res.status(200).json({
      message: "sucsessfuly",
    })
  } catch (er) {
    next(er);
  }
});
// get user khi đã đăng nhập
router.get('/get/user', async (req, res, next) => {
    if(!req.signedCookies.userEmail){
      return res.status(401).json({
        message:"Định hack à :)))))"
      })
    }
    const data = await user.findEmail(req.signedCookies.userEmail);
    if(data){
      return res.json({
        message: "found user",
        payload: data
      });
    }
    return res.status(401).json({
      message:"định hack à"
    })
});
//xoa user
router.delete("/:id", async (req, res, next) => {
  try {
    const data = await user.delete(req.params.id);
    return res.json({
      message: "sucsesstfuly"
    })
  } catch (er) {
    next(er);
  }
})
//put order
router.put('/order/:id' ,async (req, res, next) => {
  try {
    var x = await user.search(req.params.id);
    var order = await x.order
    await order.push(req.body.order)
    const data = await user.fix(req.params.id, {order});
    const User = await user.search(req.params.id);
    return res.json({
      message: "sucsessfuly",
      payload:User
    });
  } catch (er) {
    next(er);
  }
});
module.exports = router;