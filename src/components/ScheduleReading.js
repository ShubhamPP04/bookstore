import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const ScheduleReading = ({ totalPages }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBookTitle, setCurrentBookTitle] = useState('');

  const generateCalendarDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(day);
      setShowNoteInput(true);
      if (notes[day]) {
        setCurrentNote(notes[day].note);
        setCurrentPage(notes[day].page);
        setCurrentBookTitle(notes[day].bookTitle);
      } else {
        setCurrentNote('');
        setCurrentPage(1);
        setCurrentBookTitle('');
      }
    }
  };

  const handleNoteSubmit = () => {
    if (selectedDate && currentNote.trim() && currentBookTitle.trim()) {
      setNotes(prevNotes => ({
        ...prevNotes,
        [selectedDate]: { 
          note: currentNote.trim(), 
          page: currentPage,
          bookTitle: currentBookTitle.trim()
        }
      }));
      setShowNoteInput(false);
    }
  };

  const handleNoteDelete = (date) => {
    setNotes(prevNotes => {
      const updatedNotes = { ...prevNotes };
      delete updatedNotes[date];
      return updatedNotes;
    });
  };

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('readingNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes state changes
  useEffect(() => {
    localStorage.setItem('readingNotes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Schedule Reading</h2>
      <div className="p-4 bg-[#EFEDE2] rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth}>&lt;</button>
          <h3 className="text-xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="font-bold">{day}</div>
          ))}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`p-2 rounded-md cursor-pointer ${
                day === selectedDate ? 'bg-[#EF4444] text-white' : 'hover:bg-gray-300'
              } ${day === null ? 'invisible' : ''} ${notes[day] ? 'border-2 border-blue-500' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          ))}
        </div>
        {showNoteInput && (
          <div className="mt-4">
            <input
              type="text"
              className="w-full p-2 border rounded mb-2 bg-[#EFEDE2]"
              value={currentBookTitle}
              onChange={(e) => setCurrentBookTitle(e.target.value)}
              placeholder="Book Title"
            />
            <input
              type="number"
              className="w-full p-2 border rounded mb-2 bg-[#EFEDE2]"
              value={currentPage}
              onChange={(e) => setCurrentPage(Math.min(Math.max(1, parseInt(e.target.value) || 1), totalPages))}
              placeholder="Page number"
              min="1"
              max={totalPages}
            />
            <textarea
              className="w-full p-2 border rounded bg-[#EFEDE2]"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Add your reading notes here..."
            />
            <button
              className="mt-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200"
              onClick={handleNoteSubmit}
            >
              Save Note
            </button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Reading Notes</h3>
        {Object.entries(notes).length > 0 ? (
          Object.entries(notes).map(([date, { note, page, bookTitle }]) => (
            <div key={date} className="mb-2 p-3 bg-[#EFEDE2] rounded-lg shadow-md flex justify-between items-start hover:shadow-lg transition-shadow duration-200">
              <div className="flex-grow">
                <p className="font-semibold text-gray-800">Date: {date} | Book: {bookTitle} | Page: {page}</p>
                <p className="text-gray-600 mt-1">{note}</p>
              </div>
              <button
                onClick={() => handleNoteDelete(date)}
                className="ml-3 p-2 text-gray-500 hover:text-red-500 hover:bg-red-100 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                aria-label="Delete note"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No reading notes yet.</p>
        )}
      </div>
    </div>
  );
}

export default ScheduleReading;
