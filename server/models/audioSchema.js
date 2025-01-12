const mongoose = require('mongoose');
const { Schema } = mongoose;

const audioSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    duration: { type: String, required: true }, // Format: mm:ss
    uploadedAt: { type: Date, default: Date.now },
    likes:[{
        type:Schema.Types.ObjectId,
        ref:'Like'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
  });
  const Audio = mongoose.model('Audio', audioSchema);
  module.exports = Audio;
  