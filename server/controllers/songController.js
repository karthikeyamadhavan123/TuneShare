
const Song = require('../models/songSchema');
const getSongs = async (req, res) => {
    try {
        const allSongs = await Song.find({}).select("_id songName artist album duration releaseDate genre imageUrl previewLyrics");
        if (allSongs.length > 0) {
            return res.status(200).json({ allSongs, success: true })
        }
        return res.status(400).json({ success: false, message: "No songs available" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false })

    }
}

const getSongById = async (req, res) => {
    try {
        const { songId } = req.params;
        if (!songId) {
            return res.status(400).json({ success: false, message: "songId is required" })
        }
        const requiredSong = await Song.findById(songId).select("_id songName artist  duration  genre imageUrl previewLyrics");
        if (!requiredSong) {
            return res.status(400).json({ success: false, message: "song not present" })
        }
        return res.status(200).json({ success: true, requiredSong })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}

const searchSong = async (req, res) => {
    try {
        const { songName } = req.query;
        if (!songName || songName.trim() === "") {
            return res.status(400).json({ success: false, message: "songName query parameter is required" });
        }

        const requiredSong = await Song.find({
            "$or": [
                { "songName": { $regex: songName, $options: "i" } }
            ]
        }).select("_id songName artist album duration releaseDate genre imageUrl previewLyrics");

        if (requiredSong.length === 0) {
            return res.status(404).json({ success: false, message: "No matching song found" });
        }

        return res.status(200).json({ success: true, requiredSong });

    } catch (error) {
        console.error("Error in searchSong:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

module.exports = { getSongs, getSongById ,searchSong}