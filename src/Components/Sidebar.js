import { animated, useSpring } from '@react-spring/web';
import React from 'react';
import { FaBars, FaClock, FaComments, FaHome, FaTicketAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, setIsOpen }) {
  const sidebarAnimation = useSpring({
    transform: isOpen ? `translateX(0)` : `translateX(-100%)`,
    config: { tension: 300, friction: 30 }
  });

  return (
    <>
      <animated.nav style={{
        ...sidebarAnimation,
        width: '250px',
        height: '100vh',
        backgroundColor: '#2c3e50',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '20px 0',
        color: '#ecf0f1',
        zIndex: 1000
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}>
          Zoo Management
        </div>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0' }}>
            <Link to="/" style={linkStyle}>
              <FaHome style={iconStyle} /> Animals
            </Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link to="/book-ticket" style={linkStyle}>
              <FaTicketAlt style={iconStyle} /> Book Ticket
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
              <Link to="/book-time-slot" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FaClock style={iconStyle} /> Book Time Slot
              </Link>
            </li>
          <li style={{ margin: '10px 0' }}>
            <Link to="/feedback" style={linkStyle}>
              <FaComments style={iconStyle} /> Feedback
            </Link>
          </li>
          
        </ul>
      </animated.nav>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 1001,
          background: 'none',
          border: 'none',
          color: '#2c3e50',
          fontSize: '24px',
          cursor: 'pointer'
        }}
      >
        <FaBars />
      </button>
    </>
  );
}

const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  transition: 'background-color 0.3s'
};

const iconStyle = {
  marginRight: '10px'
};

export default Sidebar;
