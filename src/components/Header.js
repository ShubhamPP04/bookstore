import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBell, FaChevronDown, FaUser, FaCog, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import DefaultProfileIcon from './DefaultProfileIcon';
import styled from 'styled-components';
import SearchResults from './SearchResults';
import NotificationPopup from './NotificationPopup';
import userProfilePic from '../images/user.png';
import SettingsIcon from './icons/SettingsIcon';

const Header = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const [showVisitorPopup, setShowVisitorPopup] = useState(false);
  const visitorPopupRef = useRef(null);
  const socketRef = useRef(null);
  const [isCountAnimating, setIsCountAnimating] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchBooks(searchTerm.trim());
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchBooks = async (term) => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(term)}&fields=key,title,author_name&limit=5`);
      const data = await response.json();
      setSearchResults(data.docs || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  const handleHideSearchBar = () => {
    setShowSearchResults(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleMenuItemClick = (path) => {
    setShowProfileMenu(false);
    navigate(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNotifications = () => {
    if (!showNotifications) {
      const randomBooks = [
        "The Great Gatsby",
        "To Kill a Mockingbird",
        "1984",
        "Pride and Prejudice",
        "The Catcher in the Rye"
      ];
      const newNotifications = randomBooks
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(book => `"${book}" has been added to the library.`);
      setNotifications(newNotifications);
    }
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Simulating real-time visitor count updates
    const interval = setInterval(() => {
      setVisitorCount(prevCount => prevCount + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (visitorPopupRef.current && !visitorPopupRef.current.contains(event.target)) {
        setShowVisitorPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = io('https://bookstore-bookie.vercel.app/');

    // Listen for visitor count updates
    socketRef.current.on('visitorCountUpdate', (count) => {
      setVisitorCount(prevCount => {
        if (prevCount !== count) {
          setIsCountAnimating(true);
          setTimeout(() => setIsCountAnimating(false), 300); // Duration of the animation
        }
        return count;
      });
    });

    return () => {
      // Disconnect the socket when the component unmounts
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const toggleVisitorPopup = () => {
    setShowVisitorPopup(!showVisitorPopup);
  };

  return (
    <header className={`p-4 flex flex-col sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#EFEDE2]/95 backdrop-blur-md shadow-md' : 'bg-[#EFEDE2]'
    }`}>
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-grow max-w-xl mx-4 bg-[#EFEDE2] py-2 px-4 rounded-full flex items-center">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search book name, author, edition..."
            className="flex-grow bg-transparent px-4 outline-none text-gray-800 placeholder-gray-600"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSearchResults(true);
            }}
          />
        </div>

        {/* User Profile, Notification, and Visitor Count */}
        <div className="flex items-center space-x-6">
          <div className="relative" ref={visitorPopupRef}>
            <div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={toggleVisitorPopup}
            >
              <FaUsers className="text-gray-600 group-hover:text-gray-800" />
              <span 
                className={`text-gray-800 font-semibold group-hover:text-gray-600 transition-transform duration-300 ${
                  isCountAnimating ? 'scale-125' : 'scale-100'
                }`}
              >
                {visitorCount}
              </span>
            </div>
            {showVisitorPopup && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 px-4 z-10">
                <p className="text-sm text-gray-700">Current visitors: {visitorCount}</p>
              </div>
            )}
          </div>
          <div className="relative" ref={notificationRef}>
            <FaBell
              className="text-gray-600 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 hover:text-gray-800"
              onClick={toggleNotifications}
              size={20}
            />
            {showNotifications && (
              <NotificationPopup
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>
          <div className="relative" ref={profileMenuRef}>
            <div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={toggleProfileMenu}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {user && user.profileImage ? (
                  <img
                    className="w-full h-full object-cover"
                    src={user.profileImage}
                    alt="User Profile"
                  />
                ) : (
                  <DefaultProfileIcon />
                )}
              </div>
              <span className="text-gray-800 font-semibold group-hover:text-gray-600">User</span>
              <FaChevronDown className="text-gray-800 group-hover:text-gray-600 transition-all duration-200 ease-in-out group-hover:rotate-180" />
            </div>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a onClick={() => handleMenuItemClick('/profile')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <FaUser className="mr-2" /> Profile
                </a>
                <a onClick={() => handleMenuItemClick('/settings')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <FaCog className="mr-2" /> Settings
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaSignOutAlt className="mr-2" /> Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md z-10 mt-2 rounded-md">
          <SearchResults results={searchResults} onHideSearchBar={handleHideSearchBar} />
        </div>
      )}
    </header>
  );
};

export default Header;
