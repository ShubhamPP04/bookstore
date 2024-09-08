import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const defaultUser = {
  name: 'John Doe',
  email: 'john@example.com',
  username: 'johndoe',
  dateJoined: '2023-01-01',
  booksRead: 42,
  reviewsWritten: 15,
  profileImage: null,
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const setProfileImage = (imageUrl) => {
    setUser(prevUser => ({
      ...prevUser,
      profileImage: imageUrl
    }));
  };

  return (
    <UserContext.Provider value={{ user: user || defaultUser, setUser, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};