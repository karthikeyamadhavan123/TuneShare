import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id',response.data.user_id);
      localStorage.setItem('Username',response.data.username)
      // Assuming response.data.curruser is set correctly in the backend
      // localStorage.setItem('curruser', response.data.curruser);

      if (response.status === 200) {
        navigate('/songs');
      }

    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-3xl shadow-2xl w-full max-w-sm transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-4xl mb-6 text-white font-extrabold drop-shadow-lg text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={email}
            onChange={handleEmailChange}
            name='email' required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={password}
            onChange={handlePasswordChange}
            name='password' required
          />
        </div>
        <div className='mb-2'>
        <p className="text-gray-400 mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register-email" className="text-green-500 hover:underline">
            Sign Up here
          </Link>
        </p>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
