import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import songContext from './SongContext';
import Logout from './Logout';

const MainContent = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = useContext(songContext);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || localStorage.getItem('Username');
  const id = localStorage.getItem('user_id') || localStorage.getItem('userId');

  const onClick = async (id) => {
    try {
      let token = localStorage.getItem('userToken') || localStorage.getItem('token');
      let response = await axios.get(`http://localhost:5000/songs/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        navigate(`/songs/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      let token = localStorage.getItem('userToken') || localStorage.getItem('token');
      let response = await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('token');
        localStorage.removeItem('userId')
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        localStorage.removeItem('Username')
        navigate('/login');


      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchKeyDown = async (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      setLoading(true);
      setError(null);

      let token = localStorage.getItem('userToken') || localStorage.getItem('token');

      try {
        let response = await axios.get('http://localhost:5000/search/songs', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            query: search
          }
        });

        setSearchResults(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex-1 p-6 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 overflow-y-auto relative h-screen">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button className="bg-purple-600 py-2 px-4 rounded-full text-white hover:bg-purple-500 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 010 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="bg-purple-600 py-2 px-4 rounded-full text-white hover:bg-purple-500 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 010 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex space-x-4 items-center">
            <button className="bg-green-600 py-2 px-4 rounded-full text-white hover:bg-green-500 transition">
              Explore Premium
            </button>
            <button className="bg-indigo-600 py-2 px-4 rounded-full text-white hover:bg-indigo-500 transition">
              Install App
            </button>
            <div className="relative">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-purple-600 cursor-pointer"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-purple-700"></span>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <Logout className='pr-8' />
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleDeleteAccount}
                  >
                    Delete My Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Made For {username}</h1>
          <div className="flex space-x-2">
            <button className="bg-pink-600 py-2 px-4 rounded-full text-white hover:bg-pink-500 transition">All</button>
            <button className="bg-pink-600 py-2 px-4 rounded-full text-white hover:bg-pink-500 transition">Music</button>
            <button className="bg-pink-600 py-2 px-4 rounded-full text-white hover:bg-pink-500 transition">Podcasts</button>
          </div>
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for songs..."
            className="w-full p-2 rounded bg-purple-600 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-4 gap-6">
          {(searchResults.length > 0 ? searchResults : value).map((song, id) => (
            <div key={id} className="bg-white rounded-lg shadow-md p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">{song.title}</h3>
              <button onClick={() => onClick(song._id)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition">
                View Song
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/songs/new')}
          className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-500 transition absolute bottom-8 right-8"
        >
          +
        </button>
      </div>
    </>
  );
};

export default MainContent;
