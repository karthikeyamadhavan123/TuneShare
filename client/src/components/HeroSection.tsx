import React from 'react'
import { Ubuntu } from 'next/font/google';
import { Roboto } from 'next/font/google';
import { Sour_Gummy } from 'next/font/google';
const ubuntu = Ubuntu({
    subsets: ['latin'],
    weight: ['700'],
});
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400'],
})
const Sour = Sour_Gummy({
    subsets: ['latin'],
    weight: ['400'],
});

const HeroSection = () => {
    return (
        <div className='bg-image min-w-screen h-[550px] bg-center relative flex'>
            <div className='parent absolute z-50 text-white inset-0 flex flex-col mt-12 text-center'>
                {/* Main Heading */}
                <div className={`text${ubuntu.className}`}>
                    <h1 className={`text-4xl font-bold `}>
                        FIND YOUR SOUND, <br />
                        
                    </h1>
                    <h1 className="text-white text-4xl mt-2">SHARE YOUR VIBE</h1>

                </div>
                <div className={`mt-10 text-5xl ${roboto.className}`}>
                    <span>TUNE</span>
                    <span className='text-cyan-300'>SHARE</span></div>
                <div className='mt-10'>
                    {/* Subheading */}
                    <p className={`text-2xl  z-10 text-white ${Sour.className}`} >
                        Share Your Voice. Share Your Vision. <br />
                        Let Your Story Be Heard...

                    </p>
                    <p className={`text-2xl  z-10 text-white ${Sour.className}`}>Where Your Voice Comes to Life.</p>
                </div>

                {/* Button Group */}
                <div className={`button-group mt-9 flex justify-center flex-wrap ${Sour.className}}`}>
                    <button className={`px-6 py-2 w-32 bg-[#42bee1] text-white rounded-full mr-4 ${Sour.className}`}>
                        Home
                    </button>
                    <button className={`px-6 py-2 w-32 bg-orange-400 text-white rounded-full ${Sour.className}`}>
                        Browse
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
