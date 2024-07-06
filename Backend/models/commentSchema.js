const mongoose=require('mongoose');
const {Schema}=mongoose;

const commentSchema=new Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Songs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true
      },
      audio_recording: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Audio',
        required: true
      },
      Comments:{
        type:String,
        required:true,
      },
      created_at: {
        type: Date,
        default: Date.now
      }
})

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;