import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Library from './components/Library';
import BookDetail from './components/BookDetail';
import Profile from './components/Profile';
import MainContent from './components/MainContent';
import PopularNow from './components/PopularNow';
import AllPopularBooks from './components/AllPopularBooks';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ScheduleReading from './components/ScheduleReading';
import ReaderFriends from './components/ReaderFriends';
import Bookmarks from './components/Bookmarks';
import HistoryPage from './components/HistoryPage';
import SettingsPage from './components/SettingsPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <UserProvider>
      <Router>
        <ErrorBoundary>
          <div className="flex h-screen bg-[#EFEDE2]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 overflow-x-hidden overflow-y-auto">
                <Routes>
                  <Route path="/" element={<MainContent />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/book/:bookId" element={<BookDetail />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/popular" element={<PopularNow />} />
                  <Route path="/popular-books" element={<AllPopularBooks />} />
                  <Route path="/schedule" element={<ScheduleReading />} />
                  <Route path="/friends" element={<ReaderFriends />} />
                  <Route path="/bookmarks" element={<Bookmarks />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </main>
            </div>
          </div>
        </ErrorBoundary>
      </Router>
    </UserProvider>
  );
}

export default App;
