import React from 'react';
import { useUser } from '../context/UserContext';
import DefaultProfileIcon from './DefaultProfileIcon';
import { FaBook, FaStar, FaCalendarAlt, FaUser } from 'react-icons/fa';

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Profile</h1>
      <div className="bg-[#EFEDE2] shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-[#EFEDE2]">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 sm:mb-0 sm:mr-6">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <DefaultProfileIcon className="w-full h-full text-gray-400" />
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-semibold text-gray-800">User</h2>
              <p className="text-gray-600 mt-2">{user.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoSection title="Personal Information" icon={<FaUser />}>
              <InfoItem label="Username" value={user.username || 'user123'} />
              <InfoItem 
                label="Date Joined" 
                value={new Date(user.dateJoined || Date.now()).toLocaleDateString()} 
                icon={<FaCalendarAlt />}
              />
            </InfoSection>
            <InfoSection title="Reading Statistics" icon={<FaBook />}>
              <InfoItem label="Books Read" value={user.booksRead || 0} />
              <InfoItem 
                label="Reviews Written" 
                value={user.reviewsWritten || 0} 
                icon={<FaStar />}
              />
            </InfoSection>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoSection = ({ title, children, icon }) => (
  <div className="bg-white rounded-lg p-4 shadow">
    <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </h3>
    {children}
  </div>
);

const InfoItem = ({ label, value, icon }) => (
  <div className="flex justify-between items-center py-2">
    <span className="font-medium text-gray-600 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {label}:
    </span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default ProfilePage;