import React from 'react';


const Sidebar = () => {




  return (
    <div className="w-64 bg-gradient-to-b from-purple-800 via-pink-700 to-red-600 p-4 flex flex-col space-y-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white mb-6">Home</h1>
        
      </div>
     
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Your Library</h2>
        <div className="flex flex-col space-y-2">
          <button className="flex items-center p-2 text-left hover:bg-purple-700 rounded transition-transform transform hover:scale-105">
            <span className="w-4 h-4 bg-purple-500 mr-2 rounded-full"></span>
            <span className="text-white">Playlists</span>
          </button>
          <button className="flex items-center p-2 text-left hover:bg-purple-700 rounded transition-transform transform hover:scale-105">
            <span className="w-4 h-4 bg-purple-500 mr-2 rounded-full"></span>
            <span className="text-white">Artists</span>
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Playlists</h2>
        <div className="flex flex-col space-y-4">
          {['Liked Songs', 'My playlist #6', 'English', 'Telugu', 'Tamil'].map((playlist, index) => (
            <div key={index} className="flex items-center p-2 hover:bg-purple-700 rounded transition-transform transform hover:scale-105">
              <div className="w-10 h-10 bg-blue-400 mr-4 rounded"></div>
              <div>
                <div className="text-white">{playlist}</div>
                <div className="text-gray-300 text-sm">Karthik@cricket</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
