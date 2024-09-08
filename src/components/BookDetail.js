import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaBookOpen, FaLanguage, FaCalendarAlt, FaUserEdit, FaTags, FaQuoteLeft, FaAmazon, FaBookmark } from 'react-icons/fa';
import './customScrollbar.css';

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [randomBooks, setRandomBooks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/works/${bookId}.json`);
        const bookData = {
          title: response.data.title,
          description: response.data.description ? (
            typeof response.data.description === 'string' 
              ? response.data.description.replace(/https?:\/\/\S+/g, '')
              : response.data.description.value.replace(/https?:\/\/\S+/g, '')
          ) : 'No description available',
          coverId: response.data.covers ? response.data.covers[0] : null,
          authors: response.data.authors ? await Promise.all(response.data.authors.map(async (author) => {
            const authorResponse = await axios.get(`https://openlibrary.org${author.author.key}.json`);
            return authorResponse.data.name;
          })) : ['Unknown Author'],
          firstPublishYear: response.data.first_publish_date || 'Unknown',
          subjects: response.data.subjects || ['Unknown'],
          number_of_pages: response.data.number_of_pages || 1000,
        };
        setBook(bookData);

        // Fetch random books from fiction and non-fiction genres
        const genres = ['fiction', 'non-fiction'];
        const randomBooksPromises = genres.map(genre => 
          axios.get(`https://openlibrary.org/subjects/${genre}.json?limit=10`)
        );
        const randomResponses = await Promise.all(randomBooksPromises);
        
        const randomBooksData = randomResponses.flatMap(response => 
          response.data.works.map(book => ({
            key: book.key,
            title: book.title,
            author: book.authors[0]?.name || 'Unknown Author',
            cover_id: book.cover_id,
            genre: response.config.url.includes('fiction') ? 'Fiction' : 'NonFiction'
          }))
        );

        // Shuffle and slice to get 6 random books
        const shuffledBooks = randomBooksData.sort(() => 0.5 - Math.random()).slice(0, 6);
        setRandomBooks(shuffledBooks);
      } catch (error) {
        console.error('Error fetching book details or random books:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  useEffect(() => {
    // Check if the book is bookmarked when the component mounts
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setIsBookmarked(bookmarks.some(bookmark => bookmark.id === bookId));
  }, [bookId]);

  useEffect(() => {
    // Add book to history
    if (book) {
      const historyBooks = JSON.parse(localStorage.getItem('historyBooks')) || [];
      const updatedHistory = [
        {
          id: bookId,
          title: book.title,
          author: book.authors[0],
          imageUrl: book.coverId ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg` : 'https://via.placeholder.com/150x200?text=No+Cover',
          genre: book.subjects[0] || 'Unknown'
        },
        ...historyBooks.filter(b => b.id !== bookId)
      ].slice(0, 50); // Keep last 50 books
      localStorage.setItem('historyBooks', JSON.stringify(updatedHistory));
    }
  }, [book, bookId]);

  const openOpenLibrary = () => {
    const openLibraryUrl = `https://openlibrary.org/works/${bookId}`;
    window.open(openLibraryUrl, '_blank');
  };

  const openAmazonIndia = () => {
    const searchQuery = encodeURIComponent(`${book.title} ${book.authors[0]}`);
    const amazonUrl = `https://www.amazon.in/s?k=${searchQuery}&i=stripbooks`;
    window.open(amazonUrl, '_blank');
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== bookId);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      console.log('Bookmark removed:', bookId);
    } else {
      const newBookmark = {
        id: bookId,
        title: book.title,
        author: book.authors[0],
        coverId: book.coverId
      };
      bookmarks.push(newBookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      console.log('Bookmark added:', newBookmark);
    }
    
    setIsBookmarked(!isBookmarked);
    console.log('Bookmarks after toggle:', JSON.parse(localStorage.getItem('bookmarks')));
  };

  if (!book) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="pt-4 pb-8 bg-[#EFEDE2] min-h-screen">
      <div className="container mx-auto flex flex-col md:flex-row items-start">
        <div className="md:w-2/5 p-4 flex justify-center">
          {book.coverId ? (
            <img
              className="w-72 h-auto shadow-2xl rounded-md transition-transform duration-300 hover:scale-105"
              src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
              alt={book.title}
            />
          ) : (
            <div className="w-72 h-96 shadow-2xl rounded-md bg-gray-200 flex items-center justify-center">
              <span>No Cover Image</span>
            </div>
          )}
        </div>
        <div className="md:w-3/5 p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">{book.title}</h1>
            <button
              onClick={toggleBookmark}
              className={`text-3xl transition-all duration-300 ${
                isBookmarked ? 'text-yellow-500 transform scale-110' : 'text-gray-400'
              }`}
            >
              <FaBookmark />
            </button>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <FaUserEdit className="text-gray-500" />
            <p className="text-xl italic">{book.authors.join(', ')}</p>
          </div>
          
          <div className="flex space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <span>First Published: {book.firstPublishYear}</span>
            </div>
            <div className="flex items-center">
              <FaLanguage className="mr-2 text-gray-500" />
              <span>Language: English</span>
            </div>
          </div>
          
          {/* Glass-like "About the Book" section with hover effect */}
          <div className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg transition-all duration-300 group-hover:bg-opacity-30 group-hover:backdrop-blur-xl"></div>
            <div className="relative rounded-lg p-6 shadow-lg transition-all duration-300 border border-white border-opacity-30 group-hover:shadow-xl group-hover:border-opacity-50">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaQuoteLeft className="mr-2 text-gray-500 transition-transform duration-300 group-hover:rotate-12" />
                About the Book
              </h2>
              <div className="relative">
                <div className="absolute top-0 left-0 w-16 h-16 bg-white bg-opacity-20 rounded-full -z-10 transition-transform duration-300 group-hover:scale-110"></div>
                <p className="text-gray-700 leading-relaxed text-lg first-letter:text-3xl first-letter:font-bold first-letter:mr-1 first-letter:float-left transition-all duration-300 group-hover:text-gray-900">
                  {book.description}
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white bg-opacity-20 rounded-full -z-10 transform translate-x-1/2 translate-y-1/2 transition-transform duration-300 group-hover:scale-110"></div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <FaTags className="mr-2 text-gray-500" />
              <h3 className="text-xl font-semibold text-gray-800">Genres</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {book.subjects.slice(0, 5).map((subject, index) => (
                <span 
                  key={index} 
                  className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm border border-white border-opacity-30 transition-all duration-300 hover:bg-opacity-30 hover:backdrop-blur-md hover:shadow-md hover:scale-105 hover:text-gray-900"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={openOpenLibrary}
              className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 flex items-center justify-center w-full md:w-auto hover:shadow-lg transform hover:scale-105"
            >
              <FaBookOpen className="mr-2" />
              Start Reading
            </button>
            <button 
              onClick={openAmazonIndia}
              className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 flex items-center justify-center w-full md:w-auto hover:shadow-lg transform hover:scale-105"
            >
              <FaAmazon className="mr-2" />
              Buy on Amazon
            </button>
          </div>
        </div>
      </div>

      {/* Random Books Section */}
      <div className="container mx-auto mt-8 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">You May Also Like</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {randomBooks.map((book, index) => (
            <Link 
              to={`/book/${book.key.split('/').pop()}`} 
              key={index} 
              className="flex flex-col items-center transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative overflow-hidden rounded-md mb-4 shadow-md hover:shadow-xl transition-shadow duration-300">
                <img 
                  className="w-full h-56 object-cover rounded-md" 
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`} 
                  alt={book.title} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150x200?text=No+Cover';
                  }}
                />
              </div>
              <div className="flex flex-col items-center h-20 justify-center">
                <h3 className="text-base font-medium text-center text-gray-900 truncate w-full">{book.title}</h3>
                <p className="text-sm text-gray-600 truncate w-full text-center">{book.author}</p>
                <p className="text-xs text-gray-500 italic">{book.genre}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
