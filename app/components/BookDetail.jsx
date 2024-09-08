import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookDetail = ({ openLibraryID }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/works/${openLibraryID}.json`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [openLibraryID]);

  if (!book) {
    return <p>Loading...</p>;
  }

  const coverId = book.covers ? book.covers[0] : null;
  const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : 'https://via.placeholder.com/150';

  return (
    <div className="p-8 bg-[#EFEDE2] min-h-screen">
      <div className="flex flex-col md:flex-row items-start">
        <div className="md:w-1/2 flex justify-center items-center p-4">
          <img 
            className="w-96 h-auto shadow-2xl rounded-md" 
            src={coverUrl} 
            alt={book.title} 
          />
        </div>
        <div className="md:w-1/2 p-4">
          <h2 className="text-5xl font-semibold text-gray-900 mb-4">{book.title}</h2>
          <p className="text-lg text-gray-800 mb-4">{book.description ? book.description.value || book.description : 'No description available'}</p>

          <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md inline-flex items-center">
            Start Reading →
          </button>

          <div className="mt-8">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Editors</h3>
            <p className="text-gray-700">{book.authors.map(author => author.name).join(', ')}</p>

            <h3 className="text-xl font-medium text-gray-900 mt-4 mb-2">Language</h3>
            <p className="text-gray-700">Standard English (USA & UK)</p>

            {/* Additional book details can be included here */}
          </div>
        </div>
      </div>

      {/* Reviewer Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Reviewer</h3>
        <div className="flex items-center">
          <img className="w-12 h-12 rounded-full mr-4" src="https://example.com/reviewer.jpg" alt="Reviewer" />
          <div>
            <h4 className="text-xl text-gray-900 font-semibold">Roberto Jordan</h4>
            <p className="text-gray-700">What a delightful and magical book it is! It indeed transports readers to the wizarding world.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;