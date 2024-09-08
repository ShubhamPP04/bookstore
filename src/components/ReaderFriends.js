import React from 'react';

const PersonIcon1 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const PersonIcon2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    <circle cx="12" cy="4" r="2" />
  </svg>
);

const friends = [
  { name: 'Roberto Jordan', comment: 'Chapter Five: Diagon Alley', avatar: 'https://source.unsplash.com/random/32x32', time: '2 min ago', icon: PersonIcon1 },
  { name: 'Anna Henry', comment: 'I finished reading the chapter last night', avatar: 'https://source.unsplash.com/random/33x33', time: '5 min ago', icon: PersonIcon2 }
];

const ReaderFriends = () => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Reader Friends</h2>
      {friends.map((friend, idx) => (
        <div key={idx} className="flex items-center px-4 py-2 bg-[#EFEDE2] rounded-lg shadow-lg mb-4 transition-all duration-300 hover:shadow-xl hover:bg-[#E8E6D9]">
          <friend.icon />
          <div className="ml-4 flex-grow">
            <h3 className="font-medium">{friend.name}</h3>
            <p className="text-gray-500">{friend.comment}</p>
          </div>
          <span className="text-gray-500">{friend.time}</span>
        </div>
      ))}
    </div>
  );
}

export default ReaderFriends;
