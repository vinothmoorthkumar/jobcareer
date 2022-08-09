const express = require('express');
const router = express.Router();
const jobsController = require('../../controllers/site/homeController');
// const userController = require('../controllers/userController');
// const authController = require('../controllers/authController');
// const { catchErrors } = require('../handlers/errorHandlers');

router.get('/jobs', jobsController.list);

// router.get('/register', authController.hasLoggedIn, userController.registerForm);
// router.post('/register', 
//   userController.validateRegister,
//   catchErrors(userController.register),
//   authController.login
// );

// router.get('/login', authController.hasLoggedIn, userController.loginForm);
// router.post('/login', authController.login);

// router.get('/logout', authController.logout);

// router.get('/profile', authController.isLoggedIn, userController.getProfile);

module.exports = router;