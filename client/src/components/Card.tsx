"use client"
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface CardProps {
    title: string;
    description: string;
    image1: string;
    image2?: string;
    linkText: string;
    linkUrl?: string;
    className?: string;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    image1,
    image2,
    linkText,
    linkUrl = '/explore',
    className
}) => {
    return (
        <>
        <div className={`max-w-4xl w-full rounded-2xl bg-white p-8 ${className || ""}`}>
            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex">{title}</h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    {description}
                </p>
            </div>

            <div className="flex justify-center mb-8">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href={linkUrl}
                        className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 flex items-center"
                    >
                        {linkText}
                        <motion.svg 
                            className="w-4 h-4 ml-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                            initial={{ x: 0 }}
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                    </Link>
                </motion.div>
            </div>

            <div className="flex justify-center">
                <motion.div 
                    className="relative rounded-lg overflow-hidden shadow-md"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-full h-96">
                        <Image
                            src={image1}
                            width={700}
                            height={400}
                            alt="Featured content"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    {image2 && (
                        <motion.div 
                            className="absolute bottom-4 right-4 w-32 h-32 rounded-lg overflow-hidden border-2 border-white shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Image
                                src={image2}
                                width={128}
                                height={128}
                                alt="Secondary content"
                                className="object-cover w-full h-full"
                            />
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
        </>
    );
};

const CardStack = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["0 1", "1.33 1"]
    });

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);


    const cards = [
        {
            title: "Create, Share, and Get Noticed!🎧",
            description: "Upload your best performances, gain exposure, and connect with the right audience. Your music deserves to be heard..",
            image1: "/albums.jpg",
            linkText: "Watch now",
            linkUrl:'/'
        },
        {
            title: "Break Barriers, Reach New Heights!🎶",
            description: "No labels, no restrictions—just pure talent. Showcase your skills and let your music speak for itself.",
            image1: "/taylor.jpeg",
            linkText: "Explore artists",
            linkUrl:"/explore"
        },
        {
            title: "Discover Fresh Sounds Before They Go Viral!🔥",
            description: "Tune in to raw, unfiltered talent and explore the next generation of music stars.",
            image1: "/wanna.jpeg",
            linkText: "Get started",
            linkUrl:'/pricing'
        }
    ];

    return (
        <div className="relative min-h-screen py-20 flex flex-col justify-center items-center bg-indigo-950" ref={containerRef}>
            <motion.h1 style={{scale:scaleProgress,opacity:opacityProgress}} className="text-center text-7xl">User&apos;s Experience</motion.h1>
            <div className="mx-auto max-w-6xl px-4">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        style={{
                            scale: scaleProgress,
                            opacity: opacityProgress,
                        }}
                        className="mb-8"
                    >
                        <Card
                            title={card.title}
                            description={card.description}
                            image1={card.image1}
                            linkText={card.linkText}
                            linkUrl={card.linkUrl}
                        />
                      
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CardStack;