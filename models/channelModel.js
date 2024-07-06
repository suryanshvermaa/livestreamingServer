const mongoose=require('mongoose');

const channelSchema=new mongoose.Schema({
   channelName:{
    type:String,
    required:true,
    unique:true
   },
   streamKey:{
    type:String,
    required:true
   },
   playbackUrl:{
    type:String,
    required:true
   },
   authorised:{
    type:Boolean,
    required:true
   },
   userId:{
      type:mongoose.Schema.Types.ObjectId,
     required:true
   }

})
const Channel=mongoose.model('Channel',channelSchema);
module.exports=Channel;