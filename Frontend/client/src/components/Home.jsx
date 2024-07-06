// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleEmailSignUp = () => {
    navigate('/register-email'); // or the path to your email registration page
  };

  const handleMobileSignUp = () => {
    navigate('/register-mobile'); // or the path to your mobile registration page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="text-center">
        <h1 className="text-5xl text-white font-bold mb-8 drop-shadow-lg">Welcome to Our Service</h1>
        <p className="text-lg text-white mb-12 drop-shadow-lg">Sign up now and enjoy our amazing features!</p>
        <div className="space-y-6">
          <button
            onClick={handleEmailSignUp}
            className="bg-blue-500 text-white py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-green-500 hover:shadow-xl"
          >
            Sign Up with Email
          </button>
          <button
            onClick={handleMobileSignUp}
            className="bg-blue-500 text-white py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-green-500 hover:shadow-xl"
          >
            Sign Up with Mobile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
