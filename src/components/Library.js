import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [publishedYear, setPublishedYear] = useState('');

  const genres = ['Fiction', 'Non-fiction', 'Mystery', 'Science Fiction', 'Biography'];

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const query = selectedGenre ? `subject:${selectedGenre.toLowerCase()}` : 'popular';
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}&sort=new&limit=24&offset=${(page - 1) * 24}${publishedYear ? `&first_publish_year=${publishedYear}` : ''}&language=eng`);
      const data = await response.json();
      console.log('API Response:', data);

      if (data.docs && Array.isArray(data.docs)) {
        const newBooks = data.docs
          .filter(book => book.language && book.language.includes('eng'))
          .map(book => ({
            id: book.key,
            title: book.title,
            author: book.author_name ? book.author_name[0] : 'Unknown Author',
            genre: book.subject ? book.subject[0] : 'Unknown Genre',
            imageUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/200x300?text=No+Cover',
            first_publish_year: book.first_publish_year || 'Unknown'
          }));

        setBooks(prevBooks => {
          const updatedBooks = page === 1 ? newBooks : [...prevBooks, ...newBooks];
          console.log('Updated Books:', updatedBooks);
          return updatedBooks;
        });
        setPage(prevPage => prevPage + 1);
      } else {
        console.error('Invalid data structure received from API');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setBooks([]);
    fetchBooks();
  }, [selectedGenre, publishedYear]);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleYearChange = (e) => {
    setPublishedYear(e.target.value);
  };

  return (
    <div className="p-8 bg-[#EFEDE2]">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900">Library</h2>
      
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="relative">
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className="appearance-none bg-black text-white border border-gray-700 rounded-full py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-gray-500 transition-colors duration-300"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
        <input
          type="number"
          value={publishedYear}
          onChange={handleYearChange}
          placeholder="Published Year"
          className="bg-white text-black border border-gray-300 rounded-full py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 transition-colors duration-300 placeholder-gray-500"
        />
        <button
          onClick={() => {
            setSelectedGenre('');
            setPublishedYear('');
          }}
          className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {books.map((book, index) => (
          <Link to={`/book/${book.id.replace('/works/', '')}`} key={index} className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
            <img className="w-40 h-56 shadow-2xl rounded-md mb-4 object-cover transition-shadow duration-300 hover:shadow-3xl" src={book.imageUrl} alt={book.title} />
            <h3 className="text-base font-medium text-center text-gray-900">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="italic text-gray-700 text-xs capitalize">{book.genre}</p>
            <p className="text-xs text-gray-500">Published: {book.first_publish_year}</p>
          </Link>
        ))}
      </div>
      {books.length === 0 && !loading && (
        <p className="text-center text-gray-600 mt-8">No books found matching the selected filters.</p>
      )}
      {books.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={fetchBooks}
            disabled={loading}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full disabled:opacity-50 transition-colors duration-300"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Library;