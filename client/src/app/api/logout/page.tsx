"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/app/redux/slice'; // Adjust the path according to your slice
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Logout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleLogout = async () => {
     try {
        const response = await axios.post('http://localhost:8080/api/logout',{},{withCredentials:true})
        const {data}=response
        if(response.status===200){
            toast.success(data.message)
            dispatch(logoutUser())
            setTimeout(()=>{
                router.push('/api/login')
            },2000)
        }
        else{
            toast.error('Some Error happened')
        }
        
     } catch (error:any) {
        console.log(error);
        toast.error(error.response.data)
        
     }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <div className="text-center">
               <button onClick={handleLogout}>Logout</button>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Logout;
