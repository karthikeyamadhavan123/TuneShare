import React from 'react';
import { useState } from 'react';

const Chat = () => {
  const users = [
    { id: 1, name: 'Prasanth Mama', lastMessage: 'Thanks mama', lastMessageTime: 'Yesterday' },
    { id: 2, name: 'NANA', lastMessage: 'Image', lastMessageTime: 'Yesterday' },
  ];
  
  const [selectedUser, setSelectedUser] = useState(null);
  
  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-1/4 bg-gray-800 text-white p-4 border-r border-gray-700">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="w-full p-2 rounded bg-gray-700 placeholder-gray-500 focus:outline-none"
          />
        </div>
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-2 mb-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition duration-200"
              onClick={() => setSelectedUser(user)}
            >
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-lg font-bold text-gray-300">{user.name[0]}</span>
              </div>
              <div>
                <div className="text-sm font-semibold">{user.name}</div>
                <div className="text-xs text-gray-400">{user.lastMessage}</div>
              </div>
              <div className="ml-auto text-xs text-gray-400">{user.lastMessageTime}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-gray-900 p-6 flex flex-col">
        {selectedUser ? (
          <>
            <div className="text-xl text-white mb-4">Chatting with {selectedUser.name}</div>
            <div className="flex-1 bg-gray-800 p-4 rounded-lg overflow-y-auto">Chat messages go here...</div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full p-2 rounded bg-gray-700 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white text-xl">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
