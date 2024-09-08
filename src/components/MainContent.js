import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import PopularNow from './PopularNow';
import NewSeriesCollection from './NewSeriesCollection';
import ScheduleReading from './ScheduleReading';
import ReaderFriends from './ReaderFriends';

const MainContent = () => {
  const navigate = useNavigate(); // Add this hook
  const chatbotInitialized = useRef(false);

  useEffect(() => {
    if (!chatbotInitialized.current) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(w, d, s, ...args){
          if (w.chatbotInitialized) return;
          w.chatbotInitialized = true;
          var div = d.createElement('div');
          div.id = 'aichatbot';
          div.style.position = 'fixed';
          div.style.bottom = '20px';
          div.style.right = '20px';
          div.style.zIndex = '1000';
          d.body.appendChild(div);
          w.chatbotConfig = args;
          var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s);
          j.defer = true;
          j.type = 'module';
          j.src = 'https://aichatbot.sendbird.com/index.js';
          f.parentNode.insertBefore(j, f);
        }(window, document, 'script', '5D3FF58A-500C-4ACC-870E-99E2DF403030', 'onboarding_bot', {
          apiHost: 'https://api-cf-ap-5.sendbird.com',
        });
      `;
      document.body.appendChild(script);
      chatbotInitialized.current = true;
    }

    // No cleanup function needed
  }, []);

  const handleStartReading = () => {
    navigate('/library');
  };

  return (
    <div className="p-8 flex-1 overflow-auto bg-transparent relative">
      <div className="flex justify-between items-start mb-8">
        {/* Text Section - Left side */}
        <div className="flex flex-col space-y-4 max-w-xl">
          <h1 className="text-4xl font-semibold text-gray-900">Happy reading, <span className="font-light">Nonu</span></h1>
          <p className="text-gray-700">
            Wow! you've delved deep into the wizarding world's secrets. Have Harry's parents died yet? Oops, looks like you're not there yet. Get reading now!
          </p>
          <button 
            className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-700 flex items-center space-x-2 w-fit"
            onClick={handleStartReading} // Add this onClick handler
          >
            <span>Start reading</span>
            <span>↗</span>
          </button>
        </div>

        {/* Book Image and Information - Right side */}
        <div className="flex items-start space-x-8">
          <img
            src="https://m.media-amazon.com/images/I/510CXXt9CqL._SY780_.jpg"
            alt="Book cover of Harry Potter and the Chamber of Secrets"
            className="shadow-2xl shadow-black/50 rounded-md w-48 h-auto object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/192x288?text=Book+Cover";
            }}
          />

          <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-semibold text-gray-900">The Chamber of Secrets</h2>
            <p className="text-lg text-gray-700"><span className="text-red-500">154</span> / 300 pages</p>
            <p className="text-gray-700">
              Harry as he returns to Hogwarts school of witchcraft and wizardry for his 2nd year, only to discover that...
            </p>
            <p className="text-gray-700 italic">- JK Rowlings</p>
          </div>
        </div>
      </div>

      {/* Additional Components */}
      <div className="bg-[#EFEDE2]">
        <PopularNow />
        <NewSeriesCollection />
        <ScheduleReading />
        <ReaderFriends />
      </div>
    </div>
  );
};

export default MainContent;
