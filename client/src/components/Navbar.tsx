"use client"
import Image from "next/image";
import {motion} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between p-6">
            {/* Logo */}
            <div className="flex-row flex">
                <Image width={150} height={50} alt="Logo" src="/logo.png" />
            </div>

            {/* Desktop Navigation Links */}
            <div className="flex relative z-10 h-20 w-auto">
                <div className="relative flex justify-center h-full w-105 items-center space-x-5 px-4 py-4 z-40 text-lg lg:flex md:hidden sm:hidden xs:hidden">
                    <Link
                        href='/'
                        className={`cursor-pointer transition-all duration-300 hover:scale-105 ${isHome ? 'text-[#FFCC02] underline font-bold' : 'text-white hover:text-[#FFCC02]'}`}
                    >
                        Home
                    </Link>
                    <Link
                        href='/explore'
                        className="cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:text-[#FFCC02]"
                    >
                        Explore
                    </Link>
                    <Link
                        href='/pricing'
                        className="cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:text-[#FFCC02]"
                    >
                        Pricing
                    </Link>
                    <Link
                        href='/about'
                        className="cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:text-[#FFCC02]"
                    >
                        About
                    </Link>
                    <Link
                        href='/contact'
                        className="cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:text-[#FFCC02]"
                    >
                        Contact Us
                    </Link>
                </div>
                <div className="absolute inset-0 bg-[#D9D9D9] h-full opacity-20 rounded-lg"></div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="flex flex-row w-auto space-x-5 h-15 items-center justify-center xs:hidden sm:hidden md:flex lg:flex xl:flex">
                <Link
                    href='/api/auth/login'
                    className="px-3 py-4 items-center rounded-lg border-2 border-white text-white h-full cursor-pointer w-30 flex justify-center transition-all duration-300 hover:bg-white hover:text-blue-700 hover:scale-105"
                >
                    Log In
                </Link>
                <Link
                    href='/api/auth/register'
                    className="w-32 flex rounded-lg justify-center items-center px-3 py-4 bg-[#FFCC02] text-white h-full cursor-pointer transition-all duration-300 hover:bg-[#FFD700] hover:scale-105"
                >
                    Try for free
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex xs:flex sm:flex md:hidden lg:hidden xl:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    <Image width={64} height={64} src='/Menu.png' alt="Menu" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 bg-blue-900 w-full min-h-screen z-50 flex flex-col items-center justify-center space-y-8 md:hidden">
                    {/* Close Button (X Mark) */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 text-white text-7xl transition-all duration-300 hover:scale-110"
                    >
                        &times;
                    </button>

                    {/* Mobile Navigation Links */}
                    <h1 className="text-4xl">Welcome <span className="text-[#FFCC02] underline font-bold">Artist!</span></h1>
                    <Link
                        href='/'
                        className={`text-2xl transition-all duration-300 hover:scale-105 ${isHome ? 'font-bold underline text-[#FFD700]' : 'font-medium hover:text-[#FFCC02]'}`}
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href='/explore'
                        className="text-white text-2xl transition-all duration-300 hover:scale-105 hover:text-[#FFCC02]"
                        onClick={() => setIsOpen(false)}
                    >
                        Explore
                    </Link>
                    <Link
                        href='/pricing'
                        className="text-white text-2xl transition-all duration-300 hover:scale-105 hover:text-[#FFCC02]"
                        onClick={() => setIsOpen(false)}
                    >
                        Pricing
                    </Link>
                    <Link
                        href='/about'
                        className="text-white text-2xl transition-all duration-300 hover:scale-105 hover:text-[#FFCC02]"
                        onClick={() => setIsOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        href='/contact'
                        className="text-white text-2xl transition-all duration-300 hover:scale-105 hover:text-[#FFCC02]"
                        onClick={() => setIsOpen(false)}
                    >
                        Contact Us
                    </Link>

                    {/* Mobile Auth Buttons */}
                    <div className="flex flex-col space-y-6 mt-8">
                        <Link
                            href='/api/auth/login'
                            className="px-6 py-3 rounded-lg border-2 border-white text-white text-center cursor-pointer transition-all duration-300 hover:bg-white hover:text-blue-700 hover:scale-105"
                            onClick={() => setIsOpen(false)}
                        >
                            Log In
                        </Link>
                        <Link
                            href='/api/auth/register'
                            className="px-6 py-3 rounded-lg bg-[#FFCC02] text-white text-center cursor-pointer transition-all duration-300 hover:bg-[#FFD700] hover:scale-105"
                            onClick={() => setIsOpen(false)}
                        >
                            Try for free
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;