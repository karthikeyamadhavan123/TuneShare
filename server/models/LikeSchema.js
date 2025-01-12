const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikeSchema = new Schema({
  totalLikes: { type: Number, default: 0 }, // Use 'Number' instead of 'number'
  LikedAt: { type: Date, default: Date.now }
});

const Like = mongoose.model('Like', LikeSchema);
module.exports = Like;
