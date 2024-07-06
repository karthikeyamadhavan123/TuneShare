import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Songid from './Songid';
import Sidebar from './Sidebar';
import MainContent from './MainContent'
import songContext from './SongContext';

const Songs = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        let token = localStorage.getItem('userToken') || localStorage.getItem('token');
        let response = await axios.get('http://localhost:5000/songs/new', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setdata(response.data); // Assuming you want to log the response data

      } catch (error) {
        console.error('Error fetching songs:', error);
        // Handle error state or display error message
      }
    };

    fetchSongs();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <songContext.Provider value={data}>
      <div className='flex'>
        <Sidebar />
        <MainContent />
      </div>
    </songContext.Provider>
  );
};

export default Songs;
