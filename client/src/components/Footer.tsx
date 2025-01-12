import React from 'react';
import Link from 'next/link';
import { Facebook, Github,Twitter } from 'lucide-react'; // Import icons from lucide-react
import { Sour_Gummy } from 'next/font/google';
const Sour = Sour_Gummy({
    subsets: ['latin'],
    weight: ['400'],
});
const Footer = () => {
  return (
    <footer className={`bg-[#252241] text-white py-8 px-6 ${Sour.className}`}>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Section 1: About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We are a platform dedicated to helping creators collaborate and share their work with the world.
          </p>
        </div>

        {/* Section 2: Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/features" className="hover:underline">
                Features
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-gray-400">Email: support@example.com</p>
          <p className="text-gray-400">Phone: +1 234 567 890</p>
          <p className="text-gray-400">Address: 123 Main St, City, Country</p>
        </div>

        {/* Section 4: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <Facebook size={24} />
            </Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
              <Github size={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
              <Twitter size={24} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500">
        © 2025 YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
