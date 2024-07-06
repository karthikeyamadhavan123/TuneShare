import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from './Comments';
import { useNavigate } from 'react-router-dom';

const Audio = ({ value }) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fetchComments, setFetchComments] = useState(false);
  const [audioUploaded, setAudioUploaded] = useState(false);
  const token = localStorage.getItem('userToken') || localStorage.getItem('token');
  const userId = localStorage.getItem('userId') || localStorage.getItem('user_id');
 const navigate= useNavigate();
  useEffect(() => {
    const fetchAudio = async () => {
      const token = localStorage.getItem('userToken') || localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/songs/${value}/audio`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAudioFiles(response.data);
      } catch (error) {
        console.error('Error fetching audio files:', error);
      }
    };
    fetchAudio();
  }, [value, fetchComments]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('audio', selectedFile);

   

    try {
      await axios.post(`http://localhost:5000/${userId}/songs/${value}/audio`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      // Refresh the audio files list
      const response = await axios.get(`http://localhost:5000/songs/${value}/audio`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
 
      setAudioFiles(response.data);
      setSelectedFile(null);
      setFetchComments(!fetchComments);
      setAudioUploaded(true); // Set audio uploaded to true
    } catch (error) {
      console.error('Error uploading audio file:', error);
    }
  };

  const DeleteAudio = async (id) => {
    try {
      const token = localStorage.getItem('userToken') || localStorage.getItem('token');
      const userId = localStorage.getItem('userId') || localStorage.getItem('user_id');
      await axios.delete(`http://localhost:5000/${userId}/songs/${value}/audio/${id}`, {
        data: { userId },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setAudioFiles(audioFiles.filter(audioFile => audioFile._id !== id));
      setFetchComments(!fetchComments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Audio Files</h2>
      <div className="mb-4">
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      {audioFiles.map((audio) => (
        <div key={audio._id} className="mb-6 p-4 border rounded-lg shadow-lg bg-white transform transition-all duration-500 hover:scale-105">
          <p className="text-lg font-semibold mb-2 text-black">Recorded by: {audio.username.username}</p>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-2 rounded w-full transform transition-all duration-500 hover:scale-105 hover:rotate-2">
              <audio className="w-full" controls src={`http://localhost:5000${audio.audio_recording}`} />
            </div>
            <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transform transition-all duration-200 hover:scale-110" onClick={() => DeleteAudio(audio._id)}>Delete</button>
          </div>
          <button className='bg-lime-400 hover:bg-lime-500  text-black py-2 px-4 rounded transform transition-all duration-200 hover:scale-110' onClick={()=>navigate('/chats')}>Chat</button>
          <Comments audioId={audio._id} songId={value} fetchComments={() => setFetchComments(!fetchComments)} token={localStorage.getItem('userToken') || localStorage.getItem('token')} userId={userId} />
        </div>
      ))}
 
    </div>
  );
};

export default Audio;
