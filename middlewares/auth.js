const jwt =require('jsonwebtoken')
const authMiddleWare=async(req,res,next)=>{
    const {token}=req.cookies;
    const verified=await jwt.verify(token,'suryansh0987654321',{algorithms:"ES384"})
    if(verified){
        next();
    }else{
        res.status(403).json('unauthorised')
    }
}