"use client"
import {motion} from "framer-motion";
import Navbar from './Navbar';
import Image from 'next/image';
import Link from 'next/link';
const text="Welcome to TuneShare!"
const Main = () => {
    return (
        <>
        <div className='relative min-h-screen min-w-screen overflow-x-hidden'>
            {/* Background Video */}
            <video
                src="/video1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Navbar and Content */}
            <div className="relative z-10">
                <Navbar />
                {/* Add other content here */}
            </div>
            <div className='z-20 text-white absolute mt-10 top-1/3 p-10 flex justify-center items-start flex-col sm:-z-0'>
                <div className='flex justify-center items-center space-y-7'>
                    <motion.h1 className='text-4xl md:text-5xl lg:text-7xl w-auto font-bold text-start'>
                       {
                        text.split("").map((letter,index)=>(
                            <motion.span key={index} initial={{opacity:1}} animate={{color:'#FFCC02'}} transition={{duration:3,repeat:Infinity,
                                delay:index*0.1
                            }}>{letter}</motion.span>
                        ))
                       }
                    </motion.h1>
                    <Image 
                        src='/note.png' 
                        width={50} 
                        height={50} 
                        alt='note' 
                        className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xs:hidden md:block lg:block xl:block"
                    />
                </div>
                <div className='w-auto mt-5 flex flex-col flex-wrap sm:space-y-5 xs:space-y-5 md:space-y-10 lg:space-y-15 xl:space-y-15'>
                    <span className='text-start font-medium text-base md:text-lg lg:text-xl'>
                        TuneShare is your stage to shine. Upload your best tracks, explore incredible talent, and connect with creators who share your passion. Whether you&apos;re here to collaborate, get discovered, or find the perfect voice for your project—your journey starts now. <span className='text-[#FFCC02] font-extrabold'>Let the music speak!</span>
                    </span>

                    <div className='w-auto'>
                        <Link href='/api/auth/register' className='border-2 border-white p-5 text-2xl rounded-lg hover:bg-[#FFCC02] transition ease-in-out hover:border-none lg:text-2xl xl:text-2xl md:text-xl sm:text-lg xs:text-lg lg:p-5 xl:p-5 md:p-3 sm:p-2 xs:p-2'>Try for free</Link>
                    </div>
                </div>
            </div>
        </div>
        </>

    );
}

export default Main;