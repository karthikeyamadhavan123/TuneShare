const mongoose = require('mongoose');
const { Schema } = mongoose;

const audioSchema = new Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  songs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: true
  },
  audio_recording: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  Comments:[{
    type: mongoose.Schema.Types.ObjectId,
   ref: "Comment"
}]
});

const Audio = mongoose.model('Audio', audioSchema);
module.exports = Audio;
