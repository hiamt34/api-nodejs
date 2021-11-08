const fs = require('fs');
class ItemStore {
    constructor(){
        this.modelItem = require('../model/item.js');
    }
    all(){
        return this.modelItem.item.find();
    }
    search(id){
        return this.modelItem.item.findById(id);
    }
    add(item){
        
        return this.modelItem.item.find({},(er,data)=>{
            var data = new this.modelItem.item(item);
            data.save();
        })
    } 
    fix(id,newitem){
        return this.modelItem.item.findById(id).then((data)=>{
            if(newitem.imgs &&data.imgs.length>0){ 
                if(newitem.imgs[0]!=data.imgs[0]){
                    data.imgs.forEach(img => {
                        var check = fs.existsSync(img);
                        if(check){ fs.unlinkSync(img)}
                    });
                }              
            }
        }).then(()=>{return this.modelItem.item.findOneAndUpdate({_id:id},newitem).then((er)=>console.log(er))})
    }
    delete(id){
        return this.modelItem.item.findById(id).then((data)=>{
            if(data.imgs.length>0){ 
                data.imgs.forEach(img => {
                    var check = fs.existsSync(img);
                    if(check){ fs.unlinkSync(img)}
                });
            }
        }).then(()=>this.modelItem.item.findByIdAndRemove(id).exec())
    }
    
}
module.exports=ItemStore;