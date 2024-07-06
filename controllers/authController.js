const jwt=require('jsonwebtoken');
const {otpGenAndSend}=require('../utils/otp.js')
const User=require('../models/userModel.js')
const bcrypt=require('bcrypt')

exports.register=async(req,res)=>{
    const {name,email,password}=req.body;
    try {
      const otp=await otpGenAndSend(email);
      const pass=await bcrypt.hash(password,10);
    const payload={
      name,email,password:pass,
      otp:otp
    }
    const token=await jwt.sign(payload,'suryansh0987654321',{algorithm:'ES384'});
    res.json({token})
    } catch (error) {
      res.status(404).json('failed');
    }
}

exports.otpVerificationController=async (req, res) => {
   
    const {token,otp}=req.body;
    const payload=await jwt.decode(token);
    const userOtp=payload.otp;

   
    try {
      if(userOtp==otp){
        const user=new User({
          name:payload.name,
          email:payload.email,
          password:payload.password,
          coins:0
        })
        await user.save();
        const token=await jwt.sign({userId:user._id,name:user.name},'suryansh0987654321',{algorithm:'ES384'})
        if(token){
          return res.json({token});
        }
        
      }
    } catch (error) {
      res.status(404).json({wrong:'wrong'});
    }
   
  }

  exports.login=async(req,res)=>{
    const {email,password}=req.body;
    try {
      const user=await User.findOne({email});
      const verified=await bcrypt.compare(password,user.password);
      if(verified){
        const token=await jwt.sign({userId:user._id,name:user.name},'suryansh0987654321',{algorithm:'ES384'})
        if(token){
          return res.json({token});
        }
      }
    } catch (error) {
      res.status(404).json({wrong:'wrong'});
    }
  }