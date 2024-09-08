import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewSeriesCollection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/search.json?q=subject:(romance AND "time travel") AND publish_year:2024&sort=new&limit=5');
        if (response.data && response.data.docs && response.data.docs.length > 0) {
          setBooks(response.data.docs);
        } else {
          setError('No romance and time travel books from 2024 found');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch romance and time travel books from 2024');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">2024 Romance & Time Travel Books</h2>
      <ul className="space-y-4">
        {books.map((book, index) => (
          <li key={index} className="bg-[#EFEDE2] rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl hover:bg-[#E8E6D9]">
            <Link to={`/book/${book.key.split('/').pop()}`} className="flex items-center">
              <img 
                src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/100x150'}
                alt={book.title}
                className="w-16 h-24 object-cover rounded-md mr-4 transition-transform duration-300 hover:scale-105"
              />
              <div>
                <h3 className="font-medium text-lg">{book.title}</h3>
                <p className="text-sm text-gray-600">
                  by {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                </p>
                <p className="text-sm text-gray-500">
                  Published: 2024
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewSeriesCollection;
