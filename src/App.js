import { animated, useSpring } from '@react-spring/web';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AnimalList from './Components/AnimalList';
import BookTimeSlot from './Components/BookTimeSlot';
import FeedbackForm from './Components/FeedbackForm';
import Sidebar from './Components/Sidebar';
import SingleAnimalView from './Components/SingleAnimalView';
import TicketBooking from './Components/TicketBooking';
import './index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mainContentProps = useSpring({
    marginLeft: isSidebarOpen ? 250 : 0,
    config: { tension: 300, friction: 30 }
  });

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <animated.main style={{
          ...mainContentProps,
          flex: 1,
          padding: '20px',
          backgroundColor: '#f4f7f6'
        }}>
          <Routes>
            <Route path="/" element={<AnimalList />} />
            <Route path="/animal/:id" element={<SingleAnimalView />} />
            <Route path="/book-ticket" element={<TicketBooking />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/book-time-slot" element={<BookTimeSlot />} />
            
          </Routes>
        </animated.main>
      </div>
    </Router>
  );
}

export default App;
