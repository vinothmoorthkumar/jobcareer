const express = require('express');
const router = express.Router();
const jobsController = require('../../controllers/admin/jobs');
const authController = require('../../controllers/admin/authController');
const usersController = require('../../controllers/admin/users');

const applicationsController = require('../../controllers/admin/applications');

router.post('/jobs', authController.isLoggedIn, jobsController.save);
router.get('/jobs/:id',  authController.isLoggedIn,jobsController.getById);
router.get('/jobs',  authController.isLoggedIn,jobsController.list);
router.put('/jobs/:id',  authController.isLoggedIn,jobsController.update);
router.delete('/jobs/:id', authController.isLoggedIn, jobsController.delete);


router.post('/users', authController.isLoggedIn, usersController.save);
router.get('/users/:id',  authController.isLoggedIn,usersController.getById);
router.get('/users',  authController.isLoggedIn,usersController.list);
router.put('/users/:id',  authController.isLoggedIn,usersController.update);
router.delete('/users/:id', authController.isLoggedIn, usersController.delete);


router.post('/applicaitons', authController.isLoggedIn, applicationsController.save);
router.get('/applicaitons/:id',  authController.isLoggedIn,applicationsController.getById);
router.get('/applicaitons',  authController.isLoggedIn,applicationsController.list);
router.put('/applicaitons/:id',  authController.isLoggedIn,applicationsController.update);
router.delete('/applicaitons/:id', authController.isLoggedIn, applicationsController.delete);

router.post('/login', authController.login);

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