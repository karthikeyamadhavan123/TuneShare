import Card from '@/components/Card';
import React from 'react';
import { Sour_Gummy } from 'next/font/google';
const Sour = Sour_Gummy({
    subsets: ['latin'],
    weight: ['400'],
});
const Works = () => {
    const stepsToUseTuneShare = [
        {
            tilte: "Sign Up / Login",
            description: "Create an account or log in to start sharing your music.",
            icon: "🔑"  // Icon: Key or Lock for sign-in
        },
        {
            tilte: "Upload Your Content",
            description: "Upload your audio or video files to showcase your talent.",
            icon: "🎤"  // Icon: Microphone for recording
        },
        {
            tilte: "Explore Music",
            description: "Browse and listen to music shared by other users.",
            icon: "🎧"  // Icon: Headphones for listening
        },
        {
            tilte: "Connect with Artists",
            description: "Send messages to connect and collaborate with other users.",
            icon: "💬"  // Icon: Chat bubble for conversation
        },
        {
            tilte: "Get Hired",
            description: "Collaborate with others or get hired for gigs.",
            icon: "🤝"  // Icon: Handshake for collaboration
        }
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-[#252241] border-b-2">
                <h1 className={`col-span-full text-center text-2xl text-white ${Sour.className}`}>How it works</h1>
                {stepsToUseTuneShare.map((step, index) => (
                    <Card key={index} icon={step.icon} description={step.description} title={step.tilte} />
                ))}
            </div>
        </>


    );
};

export default Works;
