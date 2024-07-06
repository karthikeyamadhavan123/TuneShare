const mongoose = require('mongoose');
const { Schema } = mongoose;

const SongSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    lyrics: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true,
    },
    image: {
        type: String
    },
    audio_recordings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Audio"
    }],
   
})
const Song = mongoose.model('Song', SongSchema);
module.exports = Song;