"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Moo_Lah_Lah } from 'next/font/google';
import { Sour_Gummy } from 'next/font/google';

const mooLahLah = Moo_Lah_Lah({
    subsets: ['latin'],
    weight: ['400'],
});

const Sour = Sour_Gummy({
    subsets: ['latin'],
    weight: ['400'],
});

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className='bg-[#252241] w-full h-20 text-white'>
            <div className='max-w-7xl mx-auto px-4 h-full'>
                <div className='flex items-center justify-between h-full relative'>
                    {/* Logo Section */}
                    <div className='flex items-center gap-3'>
                        <img src="/music.jpg" alt="Logo" className='w-10 h-10' />
                        <Link href='/' className={`font-bold text-white font-serif text-2xl md:text-3xl lg:text-4xl ${mooLahLah.className}`}>
                            TUNESHARE
                        </Link>
                    </div>

                    {/* Desktop Navigation - Centered */}
                    <div className='hidden lg:flex absolute left-1/2 transform -translate-x-1/2'>
                        <div className={`flex space-x-4 text-xl ${Sour.className}`}>
                            <Link
                                href='/'
                                className='hover:bg-[#f69572] hover:border-2 hover:border-[#262345] hover:rounded-lg px-4 py-2 transition duration-300 ease-in-out'
                            >
                                Home
                            </Link>
                            <Link
                                href='/works'
                                className='hover:bg-[#f69572] hover:border-2 hover:border-[#262345] hover:rounded-lg px-4 py-2 transition duration-300 ease-in-out whitespace-nowrap'
                            >
                                How It Works
                            </Link>
                            <Link
                                href='/songs'
                                className='hover:bg-[#f69572] hover:border-2 hover:border-[#262345] hover:rounded-lg px-4 py-2 transition duration-300 ease-in-out'
                            >
                                Browse
                            </Link>
                            <Link
                                href='/chat'
                                className='hover:bg-[#f69572] hover:border-2 hover:border-[#262345] hover:rounded-lg px-4 py-2 transition duration-300 ease-in-out'
                            >
                                Chat
                            </Link>
                        </div>
                    </div>

                    {/* Auth Links */}
                    <div className={`hidden lg:flex items-center space-x-4 text-xl ${Sour.className}`}>
                        <Link
                            href='/api/register'
                            className='flex items-center gap-2 bg-[#2b2248] hover:bg-[#f69572] px-4 py-2 rounded-full transition duration-300 border-2'
                        >
                            <UserPlus size={20} />
                            Join The Jam
                        </Link>
                        <Link
                            href='/api/login'
                            className='flex items-center gap-2 bg-[#f69572] hover:bg-[#2b2248] px-6 py-2 rounded-full transition duration-300'
                        >
                            <LogIn size={20} />
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={toggleMenu} className='lg:hidden text-white focus:outline-none'>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Right Side */}
            <div
                className={`lg:hidden fixed top-0 right-0 w-full sm:w-96 h-full bg-[#1f1c38] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } z-50`}
            >
                <div className='p-6'>
                    <div className='flex justify-between items-center mb-8'>
                        <span className={`text-xl ${Sour.className}`}>Menu</span>
                        <button onClick={toggleMenu} className='text-white focus:outline-none'>
                            <X size={28} />
                        </button>
                    </div>
                    <div className={`flex flex-col gap-6 ${Sour.className} text-lg`}>
                        <Link
                            href='/'
                            className='hover:bg-[#f69572] hover:border-2 hover:border-[#262345] hover:rounded-lg px-4 py-2 transition duration-300 ease-in-out'
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                        <Link
                            href='/work'
                            className='hover:bg-[#f69572] hover:border-2 hover:border-[#262345] hover:rounded-lg px-4 py-2 transition duration-300 ease-in-out'
                            onClick={toggleMenu}
                        >
                            How It Works
                        </Link>
                        <Link
                            href='/songs'
                            className='hover:bg-[#f69572] hover:border-2 hover:border-[#262345] hover:rounded-lg px-4 py-2 transition duration-300 ease-in-out'
                            onClick={toggleMenu}
                        >
                            Browse
                        </Link>
                        <Link
                            href='/chat'
                            className='hover:bg-[#f69572] hover:border-2 hover:border-[#262345] hover:rounded-lg px-4 py-2 transition duration-300 ease-in-out'
                            onClick={toggleMenu}
                        >
                            Chat
                        </Link>
                        <div className='flex flex-col gap-4 mt-4 text-2xl'>
                            <Link
                                href='/register'
                                className={`flex items-center gap-2 bg-[#2b2248] hover:bg-[#f69572] px-4 py-2 rounded-full transition duration-300 border-2 border-white`}
                                onClick={toggleMenu}
                            >
                                <UserPlus size={20} />
                                Join The Jam
                            </Link>
                            <Link
                                href='/login'
                                className='flex items-center gap-2 bg-[#f69572] hover:bg-[#2b2248] px-4 py-2 rounded-full transition duration-300'
                                onClick={toggleMenu}
                            >
                                <LogIn size={20} />
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleMenu}
                />
            )}
        </nav>
    );
};

export default Navbar;