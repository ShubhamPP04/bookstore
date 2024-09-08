import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

// Copy the AnimatedIcon styled component from HomeIcon.js

const AnimatedIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  background-color: ${props => props.isActive ? 'rgb(239, 68, 68)' : 'transparent'};
  color: ${props => props.isActive ? 'white' : 'black'};

  &:hover {
    transform: scale(1.1);
    color: ${props => props.isActive ? 'white' : 'black'};
    background-color: ${props => props.isActive ? 'rgb(239, 68, 68)' : '#F5F5F5'};
  }

  svg {
    z-index: 1;
    transition: all 0.3s ease-in-out;
  }

  &:hover svg {
    transform: rotate(360deg) scale(1.2);
  }

  &.active svg {
    animation: bounce 0.5s ease-in-out;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;

const HistoryIcon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === '/history';

  const handleClick = () => {
    navigate('/history');
  };

  return (
    <AnimatedIcon
      isActive={isActive}
      className={isActive ? 'active' : ''}
      onClick={handleClick}
    >
      <FaRegClock size={20} />
    </AnimatedIcon>
  );
};

export default HistoryIcon;