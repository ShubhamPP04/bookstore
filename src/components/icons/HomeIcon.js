import React from 'react';
import { FaHome } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AnimatedIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: ${props => props.isActive ? 'rgb(239, 68, 68)' : 'transparent'};
  color: ${props => props.isActive ? 'white' : 'black'};

  &:hover {
    background-color: ${props => props.isActive ? 'rgb(239, 68, 68)' : '#F5F5F5'};
    transform: scale(1.1);
  }

  svg {
    transition: all 0.3s ease-in-out;
  }

  &:hover svg {
    transform: rotate(360deg);
  }

  &.active svg {
    animation: bounce 0.5s ease-in-out;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;

const HomeIcon = ({ isActive }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <AnimatedIcon
      isActive={isActive}
      className={isActive ? 'active' : ''}
      onClick={handleClick}
    >
      <FaHome size={20} />
    </AnimatedIcon>
  );
};

export default HomeIcon;