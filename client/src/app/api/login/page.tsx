"use client"
import React, { useState } from 'react'
import { Sour_Gummy } from 'next/font/google';
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Link from 'next/link';
import { useDispatch, UseDispatch } from 'react-redux';
import { loginUser } from '@/app/redux/slice';

const Sour = Sour_Gummy({
    subsets: ['latin'],
    weight: ['400'],
});

const Login = () => {
    const [email, setemail] = useState<string>('');
    const [password, setpassword] = useState<string>('');
    const [loading, setloading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setloading(true);
            const response = await axios.post('http://localhost:8080/api/login', {
                email,
                password
            }, { withCredentials: true });
            const {data} = response
         
            

            if (response.status === 201) {
                toast.success('Login successful');
                dispatch(loginUser(data))
                setemail('')
                setpassword('')
                setTimeout(() => {
                    router.push('/songs');
                }, 2000);
            // 
            }
            else{
                toast.error('Login Unsuccessful')
            }
        } catch (error: any) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred.');
            }
        } finally {
            setloading(false);
        }
    }

    return (
        <div className={`flex justify-center items-center min-h-screen bg-gray-900 ${Sour.className}`}>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <img
                    src="/music.jpg"
                    alt="Logo"
                    className="w-16 h-16 mx-auto mb-4 object-cover"
                />
                <h2 className={`text-center text-2xl font-bold text-white mb-6 ${Sour.className}`}>
                    Login to TUNESHARE
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="bg-gray-700 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500" 
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="bg-gray-700 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500" 
                        required
                    />
                    {
                        loading ? (
                            <button className="bg-purple-600 hover:bg-purple-700 p-3 rounded text-white font-bold" type="submit">
                                <ClipLoader color="white" size={20} />
                            </button>
                        ) : (
                            <button className="bg-purple-600 hover:bg-purple-700 p-3 rounded text-white font-bold" type="submit">
                                Login
                            </button>
                        )
                    }
                </form>
                <div className="flex justify-between mt-4 text-white flex-col">
                    <p>
                        Don’t have an account?{" "}
                        <Link href="/api/register" className="text-purple-500 font-bold hover:underline">
                            Sign Up Here
                        </Link>
                    </p>
                    <Link href="/api/forgot-password" className="text-purple-500 font-bold hover:underline mt-3">
                        Forgot Password?
                    </Link>
                </div>
                <ToastContainer position="top-right" />
            </div>
        </div>
    )
}

export default Login;
