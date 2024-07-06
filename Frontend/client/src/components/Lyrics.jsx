import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Audio from './Audio';

// Helper function to interpret "mmss" format as "minutes:seconds"
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 100);
  const seconds = duration % 100;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const Lyrics = () => {
  const { id } = useParams();
  const [songData, setSongData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const token = localStorage.getItem('userToken') || localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/songs/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const { _id, lyrics, title, owner, genre, duration, imageUrl } = response.data;
        setSongData({ _id, lyrics, title, owner, genre, duration, imageUrl });

      } catch (error) {
        setError(error);
      }
    };

    fetchSongData();
  }, [id]);

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  const deleteSong = async (songId) => {
    try {
      const token = localStorage.getItem('userToken') || localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/songs/${songId}/delete`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/songs');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-purple-600 text-white p-4">
      {Object.keys(songData).length > 0 ? (
        <div className="max-w-3xl w-full bg-white bg-opacity-20 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
          {songData.imageUrl && (
            <img src={songData.imageUrl} alt="Song" className="w-full h-64 object-cover rounded-lg mb-6" />
          )}
          {songData.title && (
            <div className="text-4xl font-bold mb-4 text-center">
              {songData.title}
            </div>
          )}
          {songData.genre && (
            <div className="text-xl italic mb-4 text-center">
              {songData.genre}
            </div>
          )}
          {songData.lyrics && (
            <div className="text-lg leading-relaxed mb-4 whitespace-pre-line">
              {songData.lyrics}
            </div>
          )}
          {songData.duration && (
            <div className="text-md italic text-center">
              {`Duration: ${formatDuration(songData.duration)}`}
            </div>
          )}
          <button 
            onClick={() => deleteSong(songData._id)} 
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete Song
          </button>
          <Audio value={id} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Lyrics;
