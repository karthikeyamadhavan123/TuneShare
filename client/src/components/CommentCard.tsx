import React from 'react';
import { Sour_Gummy } from 'next/font/google';
const Sour = Sour_Gummy({
    subsets: ['latin'],
    weight: ['400'],
});
type Comment ={
    username:string
    avatar:string 
    comment:string
    timestamp:string
}
const CommentCard = ({ username, avatar, comment, timestamp }:Comment) => {
  return (
    <div className={`flex items-start space-x-4 p-4 bg-[#565370] rounded-lg shadow-md hover:shadow-lg transition duration-300 ${Sour.className}`}>
      <img
        src={avatar}
        alt={`${username}'s avatar`}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h4 className="font-semibold text-lg">{username}</h4>
        <p className="text-gray-600 mb-2">{comment}</p>
        <span className="text-sm">{timestamp}</span>
      </div>
    </div>
  );
};

export default CommentCard;
