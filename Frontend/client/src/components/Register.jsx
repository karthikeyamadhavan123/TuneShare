// src/Register.js
import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');
  const [username, setusername] = useState('');
  const [error, setError] = useState('');
const nav=useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== passwordRe) {
      setError("Passwords don't match");
      return;
    }
    let response=await axios.post('http://localhost:5000/register-email',{
      username:username,
      email:email,
      password:password
    })
    
    localStorage.setItem('userToken',response.data.token);
    localStorage.setItem('userId',response.data.user_id);
    localStorage.setItem('username',response.data.username)
    if(response.status===201){
      nav('/songs');
    }

    setError('');
    // Handle registration logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <form
        className="bg-gray-900 p-8 rounded-3xl shadow-2xl w-full max-w-sm transform hover:scale-105 transition-transform duration-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-6 text-white font-extrabold drop-shadow-lg text-center">Register Into Company</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            name='username'required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            ame='email'required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          name='password' required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Re-type Password</label>
          <input
            type="password"
            value={passwordRe}
            onChange={(e) => setPasswordRe(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl font-bold"
        >
          Register
        </button>
        <p className="text-gray-400 mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-green-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
