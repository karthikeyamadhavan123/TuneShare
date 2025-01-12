import React from 'react';
import { Sour_Gummy } from 'next/font/google';
const Sour = Sour_Gummy({
    subsets: ['latin'],
    weight: ['400'],
});
type CardProps = {
  icon: string;
  description: string;
  title: string;
};

const Card = ({ icon, title, description }: CardProps) => {
  return (
    <div className={`max-w-xs bg-[#565370] shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 text-white ${Sour.className}`}>
      <div className="text-4xl mb-4 ">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white">{description}</p>
    </div>
  );
};

export default Card;
