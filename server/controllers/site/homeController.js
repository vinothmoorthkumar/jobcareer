const mongoose = require('mongoose');
mongoose.set("useFindAndModify",false)
const Model=  require('../../models/Jobs')

exports.list = (req, res, next) => {
    try{
        let query={};
        if(req.query.search){
            query["jobTitle"]={"$regex":req.query.search,$options:"i"};
        }
        console.log("SSSS",query)
        Model.find(query).then((result)=>{
            res.send({"message":"Success",data:result})
        })
    }catch(err){
        res.send({message:"Error",Error:err});
    }
};
