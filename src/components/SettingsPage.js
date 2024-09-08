import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { useUser, DefaultProfileIcon } from '../context/UserContext';

const SettingsPage = () => {
  const { profileImage, setProfileImage } = useUser();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      
      {/* Profile Picture Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Profile Picture</h2>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <DefaultProfileIcon />
            )}
          </div>
          <label htmlFor="imageUpload" className="flex items-center px-4 py-2 bg-black text-white rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
            <FaImage className="mr-2" /> Change Profile Picture
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Email Notifications</h2>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="mr-2"
          />
          Receive email notifications
        </label>
      </div>

      {/* Language Preferences */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Language</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
          <option value="ru">Русский</option>
          <option value="zh">中文</option>
          <option value="ja">日本語</option>
          <option value="ko">한국어</option>
        </select>
      </div>

      {/* Save Button */}
      <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;