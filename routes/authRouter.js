const express =require('express');
const { register, otpVerificationController, login } = require('../controllers/authController');
const authRouter=express.Router();

authRouter
.post('/register',register)
.post('/otp-verification',otpVerificationController)
.post('/login',login)

module.exports=authRouter;
