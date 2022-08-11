const mongoose = require('mongoose');
mongoose.set("useFindAndModify",false)
const Model=  require('../../models/appliedJobs')


exports.save = (req, res, next) => {
    try{
        req.checkBody('companyName', 'You must enter a companyName!').notEmpty();
        req.checkBody('jobTitle', 'You must enter a jobTitle!').notEmpty();
        req.checkBody('jobDescription', 'You must enter a jobDescription!').notEmpty();
        const errors = req.validationErrors();
        if(errors) {
            res.send({message:"Error",Error:erros});
            return;
        }
    
        var model= new Model({
            companyName: req.body.companyName,
            jobTitle: req.body.jobTitle,
            jobDescription: req.body.jobDescription,
        })
    
        model.save(function(err){
            if(err){
                res.send({message:"Error",Error:err});
            }else{
                res.send({"message":"Success",data:model})
            }
        })
    }catch(err){
        res.send({message:"Error",Error:err});
    }
};

exports.list = (req, res, next) => {
    try{
        Model.find({}).populate("userId").populate("jobId").then((result)=>{
            res.send({"message":"Success",data:result})
        })
    }catch(err){
        res.send({message:"Error",Error:err});
    }
};

exports.getById = (req, res, next) => {
    try{
        Model.findOne({_id:req.params.id}).then((result)=>{
            res.send({"message":"Success",data:result})
        })
    }catch(err){
        res.send({message:"Error",Error:err});
    }
};


exports.update = (req, res, next) => {
    try{
        let model={
            companyName: req.body.companyName,
            jobTitle: req.body.jobTitle,
            jobDescription: req.body.jobDescription,
        }
        Model.findOneAndUpdate({_id:req.params.id},model,{upsert:true}).then((result)=>{
            res.send({"message":"Success",data:result})
        })
    }catch(err){
        res.send({message:"Error",Error:err});
    }
};


exports.delete = (req, res, next) => {
    try{
        Model.deleteOne({_id:req.params.id}).then((result)=>{
            res.send({"message":"Success",data:result})
        })
    }catch(err){
        res.send({message:"Error",Error:err});
    }
};


