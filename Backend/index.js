const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const User = require('./models/user.js');
const bcrypt = require('bcryptjs');
const { generateToken, verifyToken } = require('./jwt.js');
const cors = require('cors');
const Song = require('./models/song.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Audio = require('./models/audioSchema.js');
const Comment = require('./models/commentSchema.js');
const bodyParser = require('body-parser');
const Conversation=require('./models/converstaionSchema.js');
const Message=require('./models/messageSchema.js');


// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
app.use('/uploads/audio', express.static(path.join(__dirname, 'uploads', 'audio')));
app.use(bodyParser.json());
// Ensure the uploads directory exists
const imageUploadDir = path.join(__dirname, 'uploads', 'images');
const audioUploadDir = path.join(__dirname, 'uploads', 'audio');

if (!fs.existsSync(imageUploadDir)) {
  fs.mkdirSync(imageUploadDir, { recursive: true });
}
if (!fs.existsSync(audioUploadDir)) {
  fs.mkdirSync(audioUploadDir, { recursive: true });
}

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/project');
  console.log('Database connected successfully');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.mimetype.startsWith('audio/') ? audioUploadDir : imageUploadDir;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const userId = req.user ? req.user.id : 'guest'; // Adjust if user information is available
    cb(null, `${userId}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

app.post('/register-email', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send('All Three Fields Are Required');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send('Username Already Registered');
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).send('Email Already Registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = generateToken(user);
    const user_id = user._id;
    res.status(201).json({ message: 'User Registration Successful', token: token, user_id, username });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    const user_id = user._id;
    const username = user.username
    res.status(200).json({ token, message: 'Login Successful', user_id, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/logout', verifyToken, (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/songs/new', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { title, lyrics, duration, genre, owner } = req.body;
    if (!title || !lyrics || !duration || !genre || !owner) {
      return res.status(400).send('All fields are required');
    }

    if (!req.file) {
      return res.status(400).send('Image is required');
    }

    const song = new Song({
      title,
      lyrics,
      owner,
      duration,
      genre,
      image: `/uploads/images/${req.file.filename}`
    });

    await song.save();
    res.status(201).send('Song successfully created');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/songs/new', verifyToken, async (req, res) => {
  try {
    const result = await Song.find({});
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/songs/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid song ID' });
    }

    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}${song.image}`;
    const songData = {
      _id: song._id,
      title: song.title,
      lyrics: song.lyrics,
      owner: song.owner,
      duration: song.duration,
      genre: song.genre,
      imageUrl: imageUrl // Add image URL to the response
    };

    res.status(200).json(songData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/songs/:id/delete', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Validate song ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid song ID');
    }

    // Find the song by ID
    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).send('Song not found');
    }
     // This should print the username of the logged-in user
    
    // Remove spaces and normalize the song owner's name
    const songOwnerNormalized = song.owner.toLowerCase().replace(/\s+/g, '');
    console.log(songOwnerNormalized);  // This should print "karthikeyamadhavan"
    
    // Remove spaces and normalize the logged-in user's username
    const loggedInUsernameNormalized = req.user.username.toLowerCase().replace(/\s+/g, '');
    console.log(loggedInUsernameNormalized);  // This should print the normalized username of the logged-in user without spaces
    
    // Check if the logged-in user is the owner of the song
    if (songOwnerNormalized !== loggedInUsernameNormalized) {
      return res.status(403).send('You do not have permission to delete this song');
    }
    
    

    // Delete all comments associated with the song
    await Comment.deleteMany({ Songs: id });

    // Delete all audio recordings associated with the song
    await Audio.deleteMany({ songs: id });

    // Delete the song itself
    await Song.findByIdAndDelete(id);

    // Send success response
    res.status(200).send('Song deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Audio-related routes

app.post('/:userId/songs/:songId/audio', verifyToken, upload.single('audio'), async (req, res) => {
  try {
    const { userId, songId } = req.params;

    // Check if userId or songId is null or undefined
    if (!userId || !songId) {
      return res.status(400).send('Invalid userId or songId');
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User Not Found');
    }

    // Find the song by ID
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).send('Song Not Found');
    }

    if (!req.file) {
      return res.status(400).send('Audio file is required');
    }

    // Create a new audio recording
    const new_audio = new Audio({
      username: user, // use user.username instead of user object
      songs: songId,
      audio_recording: `/uploads/audio/${req.file.filename}`
    });

    // Save the audio recording
    await new_audio.save();

    // Add the audio recording to the song's audio_recordings array
    song.audio_recordings.push(new_audio._id);
    await song.save();

    // Add the song to the user's Songs array
    user.Songs.push(song._id);
    await user.save();

    res.status(201).send('Audio recording successfully added to song');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/songs/:songId/audio', verifyToken, async (req, res) => {
  try {
    const { songId } = req.params;

    // Find the song by ID and populate the audio_recordings
    const song = await Song.findById(songId).populate({
      path: 'audio_recordings',
      populate: {
        path: 'username', // This will populate the username field with user data
        select: 'username' // This will only include the username field from the User model
      }
    });
    if (!song) {
      return res.status(404).send('Song Not Found');
    }

    // Return the populated audio recordings
    res.status(200).json(song.audio_recordings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/:userId/songs/:songId/audio/:audioId', verifyToken, async (req, res) => {
  try {
 
    const { userId, songId, audioId } = req.params;
    const { userId: loggedInUserId } = req.body;

    if (!userId || !songId || !audioId) {
      return res.status(400).send('Invalid userId or songId or audioId');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User Not Found');
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).send('Song Not Found');
    }

    const audio = await Audio.findById(audioId);
    if (!audio) {
      return res.status(404).send('Audio Not Found');
    }

    if (String(audio.username) !== String(loggedInUserId)) {
      return res.status(403).send('You do not have permission to delete this audio');
    }
    await Comment.deleteMany({ $and: [{ audio: audioId }, { user: userId, audio: audioId }] });

    // Delete all comments made by the user on this audio
    

    await Audio.findByIdAndDelete(audioId);


    song.audio_recordings.pull(audioId);
    await song.save();

    user.Songs.pull(songId);
    await user.save();
 
    res.status(200).send('Audio deleted successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/:userId/songs/:songId/audio/:audioId/comments', async (req, res) => {
  try {
    const { userId, songId, audioId } = req.params;

    const { comment } = req.body;
    if (!userId || !songId || !audioId) {
      return res.status(400).send('Invalid userId or songId or audioId');
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User Not Found');
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).send('Song Not Found');
    }

    const audio = await Audio.findById(audioId);
    if (!audio) {
      return res.status(404).send('Audio Not Found');
    }


    const newComment = new Comment({
      username: user,
      Songs: song,
      audio_recording: audio,
      Comments: comment,
    });
    await newComment.save();
    audio.Comments.push(newComment._id);
    await audio.save();
   
    user.Comments.push(newComment._id);
    await user.save();
    res.status(200).send('Comment created successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }

});


app.get('/:songId/songs/:audioId/audio/comments', async (req, res) => {
  try {
    const { songId, audioId } = req.params;
    if (!songId || !audioId) {
      return res.status(400).send('Invalid songId or audioId or userID');
    }


    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).send('Song Not Found');
    }

    const audio = await Audio.findById(audioId);
    if (!audio) {
      return res.status(404).send('Audio Not Found');
    }

    // Populate comments for the specific audio recording within the song
    const populatedSong = await Song.findById(songId).populate({
      path: 'audio_recordings',
      match: { _id: audioId },
      populate: {
        path: 'Comments'
      }
    }).exec();

    // Extract the audio recording with the populated comments
    const audioWithComments = populatedSong.audio_recordings.find(audio => audio._id.toString() === audioId);

    if (!audioWithComments) {
      return res.status(404).send('Comments Not Found');
    }

    res.status(200).json(audioWithComments.Comments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});





app.put('/:userId/songs/:songId/audio/:audioId/comments/:commentId/edit', verifyToken, async (req, res) => {
  try {
    const { userId, songId, audioId, commentId } = req.params;
    const { comment, userId: loggedInUserId } = req.body;
    if (!userId || !songId || !audioId || !commentId) {
      return res.status(400).send('Invalid userId or songId or audioId or Commentid');
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User Not Found');
    }


    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).send('Song Not Found');
    }

    const audio = await Audio.findById(audioId);
    if (!audio) {
      return res.status(404).send('Audio Not Found');
    }
    const oldComment = await Comment.findById(commentId);
    if (!oldComment) {
      return res.status(404).send('Comment Not Found');
    }

    if (String(oldComment.username) !== String(loggedInUserId)) {
      return res.status(403).send('You do not have permission to edit this comment');
    }
    const EditedComment = await Comment.findByIdAndUpdate(commentId, { Comments: comment }, { new: true });
    await EditedComment.save();
    res.status(200).send('Comment Edited Successfully')
  } catch (error) {
    console.log(error);
    res.send(500).send('Internal Server Error')
  }
})


// delete route
app.delete('/:userId/songs/:songId/audio/:audioId/comments/:commentId/delete', verifyToken, async (req, res) => {
  try {
    const { userId, songId, audioId, commentId } = req.params;
    const { userId: loggedInUserId } = req.body;
    if (!userId || !songId || !audioId || !commentId) {
      return res.status(400).send('Invalid userId or songId or audioId or commentId');
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User Not Found');
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).send('Song Not Found');
    }

    const audio = await Audio.findById(audioId);
    if (!audio) {
      return res.status(404).send('Audio Not Found');
    }
    const oldComment = await Comment.findById(commentId);
    if (!oldComment) {
      return res.status(404).send('Comment Not Found');
    }

    if (oldComment.username.toString() !== loggedInUserId.toString()) {

      return res.status(403).send('You do not have permission to delete this comment');
    }

    await audio.Comments.pull(commentId);
    await audio.save();
   
    await user.Comments.pull(commentId);
    await user.save();
    const DeletedComment = await Comment.findByIdAndDelete(commentId);
    if (!DeletedComment) return res.status(500).send('Failed to Delete Comment');

    res.status(200).send('Comment Deleted Successfully')
  } catch (error) {
    console.log(error);
    res.send(500).send('Internal Server Error')
  }
})


app.get('/search/songs', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).send('Query parameter is required');
    }

    const regex = new RegExp(query, 'i'); // case-insensitive and partial match
    const result = await Song.find({ title: regex }); // finds multiple songs

    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send('Song not found');
    }

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send('Id Required');
    }

    // Delete all comments made by the user
    await Comment.deleteMany({ username: id });

    // Delete all audio recordings made by the user
    await Audio.deleteMany({ username: id });

    // Delete the user
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send('User Not Found');
    }

    console.log('Successful deletion');
    res.status(200).send('User and associated data deleted successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Issue');
  }
});






































// last user delete account
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
