const express = require('express');
const router = express.Router();
const tokenVerification=require('../Verification/tokenVerification')
const songController = require('../controllers/songController')
router.get('/browse-songs',tokenVerification,songController.getSongs)
router.get('/search',tokenVerification,songController.searchSong)
router.get('/:songId',tokenVerification,songController.getSongById)
module.exports = router;