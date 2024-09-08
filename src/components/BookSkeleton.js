import React from 'react';

const BookSkeleton = () => {
  return (
    <div className="flex flex-col items-center mb-8 w-1/5 flex-shrink-0 animate-pulse">
      <div className="w-40 h-56 bg-gray-300 rounded-md mb-4"></div>
      <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-24 h-3 bg-gray-300 rounded mb-1"></div>
      <div className="w-20 h-3 bg-gray-300 rounded"></div>
    </div>
  );
};

export default BookSkeleton;