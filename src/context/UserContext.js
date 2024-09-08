import React, { createContext, useState, useContext } from 'react';
import { FaUser } from 'react-icons/fa';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);

  return (
    <UserContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export const DefaultProfileIcon = () => <FaUser className="w-full h-full text-gray-600" />;