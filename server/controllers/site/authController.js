const passport = require('passport');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const User = mongoose.model('User');
const {promisify} = require('es6-promisify');
const jwt = require("jsonwebtoken");

exports.login = async (req,res)=>{
    try {
        req.checkBody('email', 'You must enter a email!').notEmpty();
        req.checkBody('password', 'You must enter a password!').notEmpty();
        const errors = req.validationErrors();
        if(errors) {
            res.send({message:"Error",Error:errors});
            return;
        }
        const { email, password } = req.body;

        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
}

// exports.login = passport.authenticate('local', {
//     failureRedirect: '/login',
//     failureFlash: 'Failed Login!',
//     successRedirect: '/',
//     successFlash: 'You are now logged in!'
// });

// exports.isLoggedIn = (req, res, next) => {
//     // 1st check user is authenticated 
//     if(req.isAuthenticated()) {
//         return next(); // carry on they are logged in
//     }
//     req.flash('error', 'You must be logged in first!!!');
//     res.redirect('/login');
// }

// exports.hasLoggedIn = (req, res, next) => {
//     if(!req.isAuthenticated()) {
//         return next(); //if not logged in show login/register form else redirect
//     }
//     req.flash('error', 'You are already logged in!!!');
//     res.redirect('/profile');
// };

// exports.logout = (req, res) => {
//     req.logout();
//     req.flash('success', 'You have logged out successfully!!!');
//     res.redirect('/');
// };