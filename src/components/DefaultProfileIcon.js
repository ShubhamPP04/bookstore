import React from 'react';
import { FaUser } from 'react-icons/fa';

const DefaultProfileIcon = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-300">
    <FaUser className="text-gray-600" size={20} />
  </div>
);

export default DefaultProfileIcon;