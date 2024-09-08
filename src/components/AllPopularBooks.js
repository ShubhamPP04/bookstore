import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllPopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=popular&page=${page}&limit=24`);
      const data = await response.json();
      const newBooks = data.docs.map(book => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : 'Unknown Author',
        genre: book.subject ? book.subject[0] : 'Unknown Genre',
        imageUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/200x300?text=No+Cover'
      }));
      setBooks(prevBooks => [...prevBooks, ...newBooks]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-8 bg-[#EFEDE2]">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900">All Popular Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {books.map((book, index) => (
          <Link to={`/book/${book.id.replace('/works/', '')}`} key={index} className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
            <img className="w-40 h-56 shadow-2xl rounded-md mb-4 object-cover transition-shadow duration-300 hover:shadow-3xl" src={book.imageUrl} alt={book.title} />
            <h3 className="text-base font-medium text-center text-gray-900">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="italic text-gray-700 text-xs capitalize">{book.genre}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={fetchBooks}
          disabled={loading}
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full disabled:opacity-50 transition-colors duration-300"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default AllPopularBooks;