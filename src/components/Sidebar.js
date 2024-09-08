import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import bookLogo from '../images/book.png';
import HomeIcon from './icons/HomeIcon';
import LibraryIcon from './icons/LibraryIcon';
import HistoryIcon from './icons/HistoryIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import SettingsIcon from './icons/SettingsIcon';
import MenuIcon from './icons/MenuIcon';

const SidebarContainer = styled.div`
  height: 100vh;
  width: ${props => props.expanded ? '200px' : '64px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  background-color: #EFEDE2;
  transition: width 0.3s ease-in-out;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.expanded ? 'flex-start' : 'center'};
  width: 100%;
  padding: 0 0.5rem;
`;

const IconName = styled.span`
  margin-left: 1rem;
  display: ${props => props.expanded ? 'inline' : 'none'};
  white-space: nowrap;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState(location.pathname);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setActiveIcon(location.pathname);
  }, [location.pathname]);

  const navigateTo = (path) => {
    setActiveIcon(path);
    navigate(path);
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <SidebarContainer expanded={expanded}>
      {/* Logo Section */}
      <div className="mb-8">
        <IconWrapper expanded={expanded}>
          <img className="w-8 h-8" src={bookLogo} alt="Logo" />
          <IconName expanded={expanded}>Bookie</IconName>
        </IconWrapper>
      </div>

      {/* Icons Section */}
      <div className="flex-grow flex flex-col justify-center space-y-6 items-center">
        <IconWrapper expanded={expanded}>
          <HomeIcon isActive={activeIcon === '/'} onClick={() => navigateTo('/')} />
          <IconName expanded={expanded}>Home</IconName>
        </IconWrapper>
        <IconWrapper expanded={expanded}>
          <LibraryIcon isActive={activeIcon === '/library'} onClick={() => navigateTo('/library')} />
          <IconName expanded={expanded}>Library</IconName>
        </IconWrapper>
        <IconWrapper expanded={expanded}>
          <HistoryIcon isActive={activeIcon === '/history'} onClick={() => navigateTo('/history')} />
          <IconName expanded={expanded}>History</IconName>
        </IconWrapper>
        <IconWrapper expanded={expanded}>
          <BookmarkIcon isActive={activeIcon === '/bookmarks'} onClick={() => navigateTo('/bookmarks')} />
          <IconName expanded={expanded}>Bookmarks</IconName>
        </IconWrapper>
        <IconWrapper expanded={expanded}>
          <SettingsIcon isActive={activeIcon === '/settings'} onClick={() => navigateTo('/settings')} />
          <IconName expanded={expanded}>Settings</IconName>
        </IconWrapper>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto mb-4">
        <IconWrapper expanded={expanded}>
          <MenuIcon 
            isActive={expanded}
            onClick={toggleSidebar}
          />
          <IconName expanded={expanded}>Menu</IconName>
        </IconWrapper>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
