"use client";

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Sour_Gummy } from 'next/font/google';
import { useRouter } from "next/navigation";
const Sour = Sour_Gummy({
  subsets: ['latin'],
  weight: ['400'],
});
const ResetPassword = ({ token }: { token: string }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/reset-password/${token}`,
        { password }
      );
      setPassword('')
      setConfirmPassword('')
      toast.success("Password reset successful!");
      setTimeout(() => {
        router.push('/api/login')
      }, 2000)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className={`bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full ${Sour.className}`}>
      <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded bg-gray-700 text-white outline-none focus:border-fuchsia-500"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 rounded bg-gray-700 text-white outline-none"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 p-3 rounded text-white font-bold"
        >
          Reset Password
        </button>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default ResetPassword;
