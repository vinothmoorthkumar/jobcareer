const express = require('express');
const router = express.Router();
const jobsController = require('../../controllers/admin/jobs');
const authController = require('../../controllers/admin/authController');


router.post('/jobs', authController.isLoggedIn, jobsController.save);
router.get('/jobs/:id',  authController.isLoggedIn,jobsController.getById);
router.get('/jobs',  authController.isLoggedIn,jobsController.list);
router.put('/jobs/:id',  authController.isLoggedIn,jobsController.update);
router.delete('/jobs/:id', authController.isLoggedIn, jobsController.delete);


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