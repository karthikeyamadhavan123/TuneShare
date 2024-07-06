const mongoose=require('mongoose');
const {Schema}=mongoose;
// remember always have two models for chat application so messages contain a senderid(refernece:user),recieverid(refernece:user),message as string and conversationschema contains participants who are chating and messages b/w participants
const conversationSchema=new Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }]
},{timestamps:true} )
const Converstaion=mongoose.model('Converstaion',conversationSchema);
module.exports=Converstaion