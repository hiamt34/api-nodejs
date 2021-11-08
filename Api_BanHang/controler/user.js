class User {
    constructor(){
        this.modelUser = require('../model/user.js');
    }
    all(){
        return this.modelUser.user.find();
    }
    search(id){
        return this.modelUser.user.findById(id);
    }
    add(user){
        return this.modelUser.user.find({},(er,data)=>{
            var data = new this.modelUser.user(user);
            data.save();
        })
    }
    fix(id,new_uer){
        return  this.modelUser.user.findOneAndUpdate({_id:id},new_uer);
    }
    delete(id){
        return this.modelUser.user.findByIdAndRemove(id).exec();
    }
    findEmail(email){
        return this.modelUser.user.findOne({email:email});
    }
    
}
module.exports=User;