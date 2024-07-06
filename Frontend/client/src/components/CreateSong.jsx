import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateSong = () => {
  const Navigate=useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    lyrics: '',
    duration: '',
    genre: '',
    image: null,
    owner: '' // Add owner to handle input
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('lyrics', formData.lyrics);
    data.append('duration', formData.duration);
    data.append('genre', formData.genre);
    data.append('image', formData.image);
    data.append('owner', formData.owner); // Add owner to FormData

    try {
      let token = localStorage.getItem('userToken') || localStorage.getItem('token');
    let response=  await axios.post('http://localhost:5000/songs/new', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if(response.status===201){
Navigate('/songs')
      }
    } catch (error) {
      console.error('Error posting song:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-2xl rounded-lg mt-10 transform transition-transform duration-500 hover:scale-105">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Create Song</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-200 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter song title"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-200 font-semibold mb-2">Lyrics</label>
          <textarea
            name="lyrics"
            value={formData.lyrics}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter song lyrics"
            rows="4"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-200 font-semibold mb-2">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter song duration"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-200 font-semibold mb-2">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter song genre"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-200 font-semibold mb-2">Owner</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter song owner"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-200 font-semibold mb-2">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            accept="image/*"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSong;
