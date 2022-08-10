const express = require('express');
const router = express.Router();
const jobsController = require('../../controllers/site/homeController');
const userController = require('../../controllers/site/userController');
const authController = require('../../controllers/site/authController');
// const { catchErrors } = require('../handlers/errorHandlers');
router.get('/jobs/auth', authController.isLoggedIn,jobsController.authList);
router.get('/jobs', jobsController.list);
router.post('/register', userController.register);

// router.get('/register', authController.hasLoggedIn, userController.registerForm);

// router.get('/login', authController.hasLoggedIn, userController.loginForm);
router.post('/login', authController.login);

// router.get('/logout', authController.logout);

router.get('/profile', authController.isLoggedIn, userController.getProfile);
router.post('/user', authController.isLoggedIn, userController.updateProfile);
router.get('/applyJob', authController.isLoggedIn, userController.applyJob);

module.exports = router;