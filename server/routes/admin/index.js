const express = require('express');
const router = express.Router();
const jobsController = require('../../controllers/admin/jobs');
const authController = require('../../controllers/admin/authController');


router.post('/jobs', jobsController.save);
router.get('/jobs/:id', jobsController.getById);
router.get('/jobs', jobsController.list);
router.put('/jobs/:id', jobsController.update);
router.delete('/jobs/:id', jobsController.delete);


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