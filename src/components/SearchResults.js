import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ results, onHideSearchBar }) => {
  const navigate = useNavigate();

  const handleReadBook = (bookId) => {
    // Check if onHideSearchBar is a function before calling it
    if (typeof onHideSearchBar === 'function') {
      onHideSearchBar();
    }
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="mt-2 bg-[#EFEDE2] rounded-md shadow-sm">
      <ul className="max-h-60 overflow-y-auto py-2">
        {results.map((book) => (
          <li key={book.key} className="px-3 py-2 hover:bg-[#E6E4D9] transition-colors duration-200">
            <h3 className="text-sm font-medium text-[#2C4251] truncate">{book.title}</h3>
            <p className="text-xs text-[#5E5E5E] truncate mt-1">
              {book.author_name ? book.author_name[0] : 'Unknown Author'}
            </p>
            <button
              onClick={() => handleReadBook(book.key.split('/').pop())}
              className="mt-2 text-xs bg-[#D4A373] text-white py-1 px-3 rounded-full hover:bg-[#C68B59] transition-colors duration-200"
            >
              Read
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;