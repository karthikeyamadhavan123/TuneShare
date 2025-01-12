const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Audio Schema


// Define Song Schema
const songSchema = new Schema({
    songName: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    duration: { type: String },
    releaseDate: { type: Date },
    genre: { type: String },
    imageUrl: { type: String },
    previewLyrics: { type: String, required: true }, // New field for song lyrics
    audio_url: [{ type: Schema.Types.ObjectId, ref: 'Audio' }]
  });
  
  const Song = mongoose.model('Song', songSchema);
  module.exports = Song;
  
