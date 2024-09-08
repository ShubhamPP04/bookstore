import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import styled from 'styled-components';

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
    background-color: ${props => props.isActive ? 'rgb(239, 68, 68)' : 'white'};
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: ${props => props.isActive ? 'rgba(239, 68, 68, 0.7)' : 'transparent'};
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover:before {
    transform: translate(-50%, -50%) scale(1.5);
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

const LibraryIcon = ({ isActive, onClick }) => (
  <AnimatedIcon
    isActive={isActive}
    className={isActive ? 'active' : ''}
    onClick={() => onClick('/library')}
    aria-label="Library"
  >
    <FaBookOpen size={24} />
  </AnimatedIcon>
);

export default LibraryIcon;