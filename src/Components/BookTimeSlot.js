import { animated, useSpring } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import api from '../services/api';

function BookTimeSlot() {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    name: '',
    phone: '',
  });
  const [timeSlots, setTimeSlots] = useState([]);

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  });

  // Fetch existing time slots
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await api.get('/timeslots/all');
        setTimeSlots(response.data.slots);
      } catch (error) {
        alert('Error fetching time slots');
      }
    };
    fetchTimeSlots();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/timeslots/add', formData);
      alert('Time slot booked successfully!');
      setFormData({ date: '', startTime: '', endTime: '', name: '', phone: '' });
    } catch (error) {
      alert('Error booking time slot');
    }
  };

  return (
    <animated.div style={{ ...formContainerStyle, ...formAnimation }}>
      <h2 style={headerStyle}>Book a Time Slot</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Phone Number"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Book Slot</button>
      </form>

      <h3 style={{ headerStyle }}>Existing Time Slots</h3>
      <ul style={slotListStyle}>
        {timeSlots.map((slot) => (
          <li key={slot._id} style={slotItemStyle}>
            <strong>Date:</strong> {slot.date} | <strong>Time:</strong> {slot.startTime} - {slot.endTime} | <strong>Name:</strong> {slot.name} | <strong>Phone:</strong> {slot.phone} | <strong>Status:</strong> {slot.status}
          </li>
        ))}
      </ul>
    </animated.div>
  );
}

const formContainerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '30px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};

const headerStyle = {
  textAlign: 'center',
  color: '#2c3e50',
  marginBottom: '20px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  marginBottom: '15px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const slotListStyle = {
  listStyleType: 'none',
  padding: 0,
};

const slotItemStyle = {
  padding: '10px',
  margin: '5px 0',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
};

export default BookTimeSlot;
