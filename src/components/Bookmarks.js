import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaBook } from 'react-icons/fa';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const loadBookmarks = () => {
      const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      console.log('Loaded bookmarks:', storedBookmarks);
      setBookmarks(storedBookmarks);
    };

    loadBookmarks();
    window.addEventListener('storage', loadBookmarks);

    return () => {
      window.removeEventListener('storage', loadBookmarks);
    };
  }, []);

  const removeBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    console.log('Bookmark removed:', id);
    console.log('Updated bookmarks:', updatedBookmarks);
  };

  return (
    <div className="bg-[#EFEDE2] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-bold mb-12 text-center" style={{
          fontFamily: "'Playfair Display', serif",
          color: '#2A2A2A',
          letterSpacing: '1px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}>
          My Bookshelf
        </h1>
        {bookmarks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <FaBook className="text-6xl text-gray-400 mb-4 mx-auto" />
            <p className="text-xl text-gray-600 mb-6">Your bookshelf is empty. Time to add some magical reads!</p>
            <Link to="/" className="bg-[#740001] hover:bg-[#ae0001] text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center">
              <FaBook className="mr-2" /> Discover Books
            </Link>
          </div>
        ) : (
          <div className="relative">
            {[...Array(Math.ceil(bookmarks.length / 4))].map((_, shelfIndex) => (
              <div key={shelfIndex} className="mb-16">
                <div className="flex justify-start items-end space-x-4 mb-2">
                  {bookmarks.slice(shelfIndex * 4, shelfIndex * 4 + 4).map((book) => (
                    <div key={book.id} className="w-[150px] relative group">
                      <Link to={`/book/${book.id}`} className="block">
                        <img
                          src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                          alt={book.title}
                          className="w-full h-[200px] object-cover shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300"
                          style={{ boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <p className="text-white text-center text-sm px-2">{book.title}</p>
                        </div>
                      </Link>
                      <button
                        onClick={() => removeBookmark(book.id)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        title="Remove from bookmarks"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="h-4 bg-[#8B4513] rounded-t-lg shadow-lg"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
