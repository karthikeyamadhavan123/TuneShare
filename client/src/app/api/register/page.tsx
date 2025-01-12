"use client"
import React, { useState } from 'react'
import { Sour_Gummy } from 'next/font/google';
import ClipLoader from 'react-spinners/ClipLoader';
import { registerUser } from '@/app/redux/slice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Link from 'next/link';

const Sour = Sour_Gummy({
    subsets: ['latin'],
    weight: ['400'],
});

const Form = () => {
    const [username, setusername] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const [email, setemail] = useState<string>('')
    const [image, setimage] = useState<File | null>(null)
    const [loading, setloading] = useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const router = useRouter()
    const dispatch = useDispatch()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setimage(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        formData.append('email', email)
        if (image) {
            formData.append('image', image)
        }
        try {
            setloading(true)
            const response = await axios.post('http://localhost:8080/api/register',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }, withCredentials: true
                })
            


            if (response.status === 201) {
                const data = response.data
                dispatch(registerUser(data))
                setusername('')
                setemail('')
                setpassword('')
                setimage(null)
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                }
                toast.success(data.message)
                setTimeout(() => {
                    router.push('/songs')
                }, 2000)

            }
            else {
                toast.error('Network Error')
            }

        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            setloading(false)
        }
    }

    return (
        <div className={`flex justify-center items-center min-h-screen bg-gray-900 ${Sour.className}`}>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <img
                    src="/music.jpg"
                    alt="Logo"
                    className="w-16 h-16 mx-auto mb-4  object-cover"
                />
                <h2 className={`text-center text-2xl font-bold text-white mb-6 ${Sour.className}`}>
                    Sign Up To TUNESHARE
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        name='username'
                        className="bg-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="bg-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="bg-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required
                    />
                    <input
                        type="file"
                        name="image"
                        placeholder="ImageUrl"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="bg-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required
                    />
                    {
                        loading ? (
                            <button className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg text-white font-bold" type='submit'>
                                <ClipLoader color='white' size={20} />
                            </button>
                        ) : (
                            <button className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg text-white font-bold" type='submit'>
                                Sign Up
                            </button>
                        )
                    }
                </form>
                <p className="mt-4 text-white">
                    Already have an account?{" "}
                    <Link href="/api/login" className="text-purple-500 font-bold hover:underline">
                        Login Here
                    </Link>
                </p>
                <ToastContainer position='top-right' />
            </div>
        </div>
    )
}

export default Form
