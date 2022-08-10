const mongoose = require('mongoose');
mongoose.set("useFindAndModify",false)
const Model = mongoose.model('User');
const bcrypt = require("bcrypt");

// const { promisify } = require('es6-promisify');

// exports.registerForm = (req, res) => {
//     res.render('register',{ title:'Register' });
// };

// exports.loginForm = (req, res) => {
//     res.render('login',{ title:'Login' });
// };

// exports.validateRegister = (req, res, next) => {
//     req.sanitizeBody('name');
//     req.checkBody('name', 'You must enter a Name!').notEmpty();
//     req.checkBody('email', 'Not a valid Email!').isEmail();
//     req.sanitizeBody('email').normalizeEmail({
//         remove_dots: false,
//         remove_extension: false,
//         gmail_remove_subaddress: false
//     });

//     req.checkBody('password', 'You must enter a password!').notEmpty();
//     req.checkBody('password-confirm', 'You must confirm a password!').notEmpty();
//     req.checkBody('password-confirm', 'Oops! Your passwords did not match!').equals(req.body.password);

//     const errors = req.validationErrors();
//     if(errors) {
//         req.flash('error', errors.map(err => err.msg));
//         res.render('register', {title: 'Register', body: req.body, flashes: req.flash() });
//         return;
//     }

//     next();

// };

exports.register = async (req, res, next) => {
    try{
        req.checkBody('email', 'You must enter a email!').notEmpty();
        req.checkBody('name', 'You must enter a name!').notEmpty();
        req.checkBody('password', 'You must enter a password!').notEmpty();
        req.checkBody('mobile', 'You must enter a mobile!').notEmpty();

        const errors = req.validationErrors();
        if(errors) {
            res.send({message:"Error",Error:errors});
            return;
        }
    
        var model= new Model({
            email: req.body.email,
            name: req.body.name,
            mobile: req.body.mobile,
        })
    
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        model.password = await bcrypt.hash(req.body.password, salt);

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

exports.getProfile = (req, res) => {
    try{
        Model.findOne({}).then((result)=>{
            res.send({"message":"Success",data:result})
        })
    }catch(err){
        res.send({message:"Error",Error:err});
    }
}

exports.updateProfile = (req, res) => {
    try{
        let model={
            mobile: req.body.mobile,
            name: req.body.name,
            workExp: req.body.workExp,
        }
        Model.findOneAndUpdate({_id:req.user.user_id},model,{upsert:true}).then((result)=>{
            res.send({"message":"Success",data:result})
        })
    }catch(err){
        res.send({message:"Error",Error:err});
    }
}
