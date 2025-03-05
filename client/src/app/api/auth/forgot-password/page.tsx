"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { FiMail, FiRefreshCw } from "react-icons/fi";
import Link from "next/link";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.NEXT_PUBLIC_DB_URL + "/api/auth/forgot-password"
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return toast.error("Please enter your email!");
        setLoading(true);
        try {
            await axios.post(apiUrl, { email });
            toast.success("Reset link sent! Check your email.");
            setEmail('')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen bg-indigo-950 text-gray-900 px-4"
        >
            <Toaster position="top-right" reverseOrder={false} />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center"
            >
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">Forgot Password</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Enter your email to receive a reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 pl-10 rounded-md bg-gray-100 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold py-2 rounded-md flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <ScaleLoader color="#fff" height={15} />
                        ) : (
                            <>
                                <FiRefreshCw className="text-lg" /> Send Reset Link
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-600">
                    Remembered your password?{" "}
                    <Link href="/api/auth/login" className="text-indigo-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    );
};

export default ForgotPassword;
