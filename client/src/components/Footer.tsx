import { FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-950 to-indigo-900 text-white py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top section with logo and social */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-indigo-800 pb-6">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <Image 
                src="/logo.png" 
                width={120} 
                height={160} 
                alt="TuneShare Logo"
                className="hover:opacity-90 transition-opacity" 
              />
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center space-x-6">
            <Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-2xl">
              <FaFacebook />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-2xl">
              <FaTwitter />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-2xl">
              <FaInstagram />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-indigo-400 transition-colors text-2xl">
              <FaDiscord />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-red-500 transition-colors text-2xl">
              <FaYoutube />
            </Link>
          </div>
        </div>
        
        {/* Middle section with links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">TuneShare</h3>
            <ul className="text-gray-300 space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Explore Column */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Explore</h3>
            <ul className="text-gray-300 space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  Discover Music
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  Genres
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  Playlists
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Column */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Support</h3>
            <ul className="text-gray-300 space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors inline-block">
                  Report an Issue
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-indigo-800 text-white placeholder-gray-400 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto mb-2 sm:mb-0"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-r-md transition-colors sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom section with copyright and legal links */}
        <div className="border-t border-indigo-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2025 TuneShare. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center">
            <Link href="#" className="text-gray-400 hover:text-white mx-3 mb-2 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white mx-3 mb-2 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white mx-3 mb-2 transition-colors">
              Copyright
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white mx-3 mb-2 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;