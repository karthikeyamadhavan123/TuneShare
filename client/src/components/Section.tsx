"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Section = () => {
  return (
    <section className="text-center text-white flex flex-col lg:flex-row justify-between items-center mt-2 min-h-[600px] px-4 lg:px-12 ">
      {/* Left Text Section */}
      <motion.div
        className="flex flex-col justify-center items-center lg:items-start gap-9 mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold">Start your journey!!🔥</h1>
        <p className="font-semibold text-lg md:text-xl text-center lg:text-left">
          Tune in to raw, unfiltered talent and explore the next generation of music stars!
        </p>
        
        {/* Animated Button */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/api/auth/register"
            className="px-6 py-3 rounded-lg text-white bg-blue-500 font-semibold hover:bg-blue-600 transition-shadow shadow-md hover:shadow-lg"
          >
            Try for Free
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Right Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] mt-4 lg:mt-0 lg:ml-6 "
      >
        <Image
          src="/collection.png"
          alt="Music Collection"
          width={1100}
          height={650}
          className="w-full h-auto"
        />
      </motion.div>
    </section>
  );
};

export default Section;