import React from 'react';
import { FaTimes } from 'react-icons/fa';

const NotificationPopup = ({ notifications, onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <FaTimes />
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b last:border-b-0">
              <p className="text-sm text-gray-800">{notification}</p>
            </div>
          ))
        ) : (
          <p className="px-4 py-3 text-sm text-gray-500">No new notifications</p>
        )}
      </div>
      <div className="px-4 py-2 border-t">
        <button
          onClick={onClose}
          className="w-full text-center py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationPopup;