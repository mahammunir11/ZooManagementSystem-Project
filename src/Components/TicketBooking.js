import { animated, useSpring } from '@react-spring/web';
import React, { useState } from 'react';
import api from '../services/api';

function TicketBooking() {
  const [formData, setFormData] = useState({
    visitorName: '',
    email: '',
    date: '',
    quantity: 1
  });

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tickets', formData);
      alert('Ticket booked successfully!');
      setFormData({ visitorName: '', email: '', date: '', quantity: 1 });
    } catch (error) {
      alert('Error booking ticket');
    }
  };

  return (
    <animated.div style={{ ...formContainerStyle, ...formAnimation }}>
      <h2 style={headerStyle}>Book a Ticket</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="visitorName"
          value={formData.visitorName}
          onChange={handleChange}
          placeholder="Your Name"
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          style={inputStyle}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Book Ticket</button>
      </form>
    </animated.div>
  );
}

const formContainerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '30px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

const headerStyle = {
  textAlign: 'center',
  color: '#2c3e50',
  marginBottom: '20px'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const inputStyle = {
  marginBottom: '15px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px'
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s'
};

export default TicketBooking;
