const mongoose = require('mongoose');
mongoose.set("useFindAndModify",false)
const Model=  require('../../models/Jobs')

exports.list = (req, res, next) => {
    try{
        Model.find({}).then((result)=>{
            res.send({"message":"Success",data:result})
        })
    }catch(err){
        res.send({message:"Error",Error:err});
    }
};
