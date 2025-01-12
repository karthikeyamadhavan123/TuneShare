import React from 'react';
import CommentCard from './CommentCard';
import { Sour_Gummy } from 'next/font/google';
const Sour = Sour_Gummy({
    subsets: ['latin'],
    weight: ['400'],
});
const comments = [
    {
        username: 'John Doe',
        avatar: 'https://via.placeholder.com/50',
        comment: 'Amazing platform! I found great collaborators here.',
        timestamp: '2 hours ago'
    },
    {
        username: 'Jane Smith',
        avatar: 'https://via.placeholder.com/50',
        comment: 'Love the interface and how easy it is to upload content.',
        timestamp: '1 day ago'
    },
    {
        username: 'Mike Johnson',
        avatar: 'https://via.placeholder.com/50',
        comment: 'Looking forward to more features!',
        timestamp: '3 days ago'
    },
    {
        username: 'Anna Williams',
        avatar: 'https://via.placeholder.com/50',
        comment: 'The support team is very responsive!',
        timestamp: '5 days ago'
    }
];

const CommentSection = () => {
    return (
        <div className="p-6 bg-[#252241] text-white border-b-2">
            <h2 className={`text-2xl font-semibold text-white mb-4 text-center ${Sour.className}`}>Comments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {comments.map((comment, index) => (
                    <CommentCard
                        key={index}
                        username={comment.username}
                        avatar={comment.avatar}
                        comment={comment.comment}
                        timestamp={comment.timestamp}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
