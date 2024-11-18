import express from 'express';
import { getAllOrdersController, getAllUsersController, getOrdersController, registerController, updateOrderStatusController, updateProfileController } from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { testController } from '../controllers/authController.js';
import { forgotpassword, isAdmin,  requiresignin, otpforpassword, changepassword  } from '../middlewares/authMiddleware.js';
import { mail } from '../helpers/sendmail.js';


const router = express.Router();

//routing 
//register
router.post('/register' , registerController );  

//login 
router.post('/login' , loginController);

//test routes
router.get('/test', requiresignin, isAdmin, testController);

//Protected route auth
router.get('/dashboard', requiresignin, (req, res) => {
    res.status(200).send({success: true})
});

//Admin
router.get('/admin',requiresignin ,isAdmin, (req, res) => {
    res.status(200).send({success: true})
});

//sendmail
router.post('/sendmail', mail, (req, res) => {
    res.status(200).send({success: true})
});

//Get Email & Send OTP
router.post('/forgot', forgotpassword, mail)

//Varify OTP
router.post('/otpvarify', otpforpassword)

//Reset Password
router.put('/modifiedpassword' , changepassword)

//Profile Update
router.put('/profile', requiresignin, updateProfileController)

// get user Orders
router.get('/orders', requiresignin, getOrdersController)

// get all Orders in dashboard
router.get('/all-orders', requiresignin, isAdmin, getAllOrdersController)

// Order status update
router.put('/order-status', requiresignin, isAdmin, updateOrderStatusController)

// get all users in Admin dashboard
router.get('/get-all-users', requiresignin, isAdmin, getAllUsersController)


export default router;   