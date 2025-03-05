"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { motion } from 'framer-motion'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_DB_URL + "/api/auth/login";// Debugging
      const response = await axios.post(apiUrl, { email, password }, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Login successful");
        setEmail("");
        setPassword("");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
    finally {
      setIsLoading(false)
    }
  };
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.1, // Stagger animation for each letter
      },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-indigo-950">
        <motion.div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl" variants={formVariants} initial='hidden' animate='visible'>
          <motion.h1 className="text-4xl font-bold text-center text-blue-500 mb-8" variants={textVariants} initial='hidden' animate='visible'>
            {"Welcome back!!".split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Wrap full form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-500transition-all text-gray-700"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition-all text-gray-700"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            {/* Submit Button */}
            {
              isLoading ? (
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                >
                  <ScaleLoader color="#FFFFFF"/>
                </button>
              ) : <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all cursor-pointer"
              >
                Log In
              </button>
            }

          </form>

          {/* Forgot Password Link */}
          <div className="text-center mt-6">
            <Link href="/api/auth/forgot-password" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Don&apos;t have an account? </span>
            <Link href="/api/auth/register" className="text-sm text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
