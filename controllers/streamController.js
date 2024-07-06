const jwt=require('jsonwebtoken');
const User=require('../models/userModel.js')
const Channel = require('../models/channelModel.js');

exports.createChannel=async(req,res)=>{
        
        const {channelName,authorised,userId}=req.body;
      try {
        const alphabetsAndNum='abcd1735efghi09388jklmnopqrstuvwxyz'
        let streamKey='';
        for(let i=0;i<25;i++){
            const randomNumber=Math.random()*10;
            const roundNumber=Math.floor(randomNumber)
            streamKey+=alphabetsAndNum[roundNumber]
        }
        const streamKeyPayload={
            userId,
            channelName,
            streamKey
        }
        const token=await jwt.sign(streamKeyPayload,"suryansh0987654321");
        const playbackUrl=`http://localhost:1935/live/${channelName}`
        const channel=new Channel({
            channelName,authorised,userId,streamKey,playbackUrl
        })
       await channel.save();
       res.json({
        channelName,authorised,userId,streamKey,playbackUrl
       })
      } catch (error) {
        res.status(403).json('failed creation of channel');
      }
    
}

exports.signPlaybackUrl=async(req,res)=>{
    const {playbackUrl,userId}=req.body;
   try {
    if(playbackUrl&&userId){
        const payload={
            playbackUrl,userId
        }
        const token=await jwt.sign(payload,'hufsssssssssssssssssssssssssssssssssssssssssshfhjsghshghlgsljdjzhmzndz');
        const url=`${playbackUrl}?token=${token}`
        res.json({signedUrl:url});
    }
   } catch (error) {
    res.status(403).json('failed to sign url');
   }
}

exports.verifyStreamKey=async(req,res)=>{
    const {key}=req.query;
    console.log(key);
   try {
        const channel=await Channel.findOne({streamKey:key});
        if(channel){
            return res.status(200).json('verified')
        }else{
return res.status(404).json('unotherised')
}
     
   } catch (error) {
    return res.status(404).json('unauthorised');
   }
}

exports.verifyPlaybackUrl=async(req,res)=>{
  const {token}=req.query;
  console.log(token);
  try {
    const verified=await jwt.verify(token,"hufsssssssssssssssssssssssssssssssssssssssssshfhjsghshghlgsljdjzhmzndz")
  if(verified){
    return res.json("verified");
  }
  } catch (error) {
    return res.status(403).json("unauthorised");
  }
}

