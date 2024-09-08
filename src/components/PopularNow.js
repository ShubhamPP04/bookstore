import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './customScrollbar.css'; // Import custom scrollbar styles

// Add this new import
import BookSkeleton from './BookSkeleton';

const PopularNow = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const genres = ['fiction', 'romance', 'mystery', 'fantasy', 'thriller'];
        const bookPromises = genres.map(genre =>
          axios.get(`https://openlibrary.org/subjects/${genre}.json?limit=2`)
        );
        const responses = await Promise.all(bookPromises);
        
        const bookData = responses.flatMap(response =>
          response.data.works.map(book => ({
            id: book.key.split('/').pop(),
            title: book.title,
            author: book.authors[0].name,
            genre: response.config.url.split('/')[4].split('.')[0],
            imageUrl: `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`,
          }))
        );
        
        setBooks(bookData.slice(0, 7)); // Limit to 7 books total
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSeeMore = () => {
    navigate('/popular-books', { state: { books } });
  };

  return (
    <div className="p-8 bg-[#EFEDE2]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Popular Now</h2>
        <button 
          onClick={handleSeeMore}
          className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium"
        >
          See More
        </button>
      </div>
      <div className="flex justify-between space-x-4 overflow-x-auto">
        {loading
          ? Array(7).fill().map((_, index) => (
              <BookSkeleton key={index} />
            ))
          : books.map((book, index) => (
              <Link 
                to={`/book/${book.id}`} 
                key={index} 
                className="flex flex-col items-center mb-8 w-1/5 flex-shrink-0 transition-all duration-300 ease-in-out hover:translate-y-2"
              >
                <div className="relative overflow-hidden rounded-md mb-4 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <img 
                    className="w-40 h-56 object-cover rounded-md" 
                    src={book.imageUrl} 
                    alt={book.title} 
                  />
                </div>
                <h3 className="text-base font-medium text-center text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
                <p className="italic text-gray-700 text-xs capitalize">{book.genre}</p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default PopularNow;
