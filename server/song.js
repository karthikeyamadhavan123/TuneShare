const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
require("dotenv").config()
const Song = require("../server/models/songSchema"); // Import Song model

// Cloudinary credentials setup
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUD_API_KEY, // Replace with your API key
  api_secret: process.env.CLOUD_SECRET, // Replace with your API secret
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Read data from JSON file
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

// Function to upload image to Cloudinary and return the URL
const uploadImageToCloudinary = async (imageUrl) => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "songs_images",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

// Main function to process data and store in MongoDB
const processAndStoreData = async () => {
  for (let song of data) {
    try {
      const uploadedImageUrl = await uploadImageToCloudinary(song.imageUrl);
      if (uploadedImageUrl) {
        song.imageUrl = uploadedImageUrl; // Update imageUrl with Cloudinary link
        const newSong = new Song(song);
        await newSong.save();
        console.log(`Successfully saved: ${song.songName}`);
      }
    } catch (error) {
      console.error(`Error saving song: ${song.songName}`, error);
    }
  }

  console.log("All data processed.");
  mongoose.disconnect();
};

processAndStoreData();
