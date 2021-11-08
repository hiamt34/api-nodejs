
var modelAdmin = require('./../model/admin')
var modelUser = require('./../model/user')
var md5 = require('md5')
module.exports.register_Admin=async(req,res,next)=>{
    const data = await modelAdmin.admin.findOne({email:req.body.email});
    if(!data){
        next()
    }else{
        return res.status(401).json({
            message:"Email đã tồn tại"
        })
    }
}

module.exports.register_User=async(req,res,next)=>{
    const data = await modelUser.user.findOne({email:req.body.email});
    if(!data){
        next()
    }else{
        return res.status(401).json({
            message:"Email đã tồn tại"
        })
    }
}
//dang nhap
module.exports.register_Login=async(req,res,next)=>{
    const data = await modelUser.user.findOne({email:req.body.email,password:md5(req.body.password)});
    if(data){
        await res.cookie('userEmail',req.body.email,{
            signed:true
        })
        next()
    }else{
        return res.status(401).json({
            message:"sai email or password"
        })
    }
}

module.exports.change_Password=async(req,res,next)=>{
    
    const data = await modelUser.user.findOne({_id:req.body._id,email:req.body.email,password:md5(req.body.password)});
    
    if(data){
        next()
    }else{
        return res.status(401).json({
            message:"sai email or password"
        })
    }
}