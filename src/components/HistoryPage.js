import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const HistoryPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch history books from local storage or API
    const historyBooks = JSON.parse(localStorage.getItem('historyBooks')) || [];
    setBooks(historyBooks);
  }, []);

  const removeBook = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('historyBooks', JSON.stringify(updatedBooks));
  };

  return (
    <div className="p-8 bg-[#EFEDE2]">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900">Reading History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {books.map((book, index) => (
          <div key={index} className="relative flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
            <Link to={`/book/${book.id.replace('/works/', '')}`}>
              <img className="w-40 h-56 shadow-2xl rounded-md mb-4 object-cover transition-shadow duration-300 hover:shadow-3xl" src={book.imageUrl} alt={book.title} />
            </Link>
            <button
              onClick={() => removeBook(book.id)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-300"
            >
              <FaTimes size={16} />
            </button>
            <h3 className="text-base font-medium text-center text-gray-900">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="italic text-gray-700 text-xs capitalize">{book.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;