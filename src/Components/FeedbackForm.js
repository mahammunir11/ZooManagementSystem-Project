import { animated, useSpring } from '@react-spring/web';
import React, { useState } from 'react';
import api from '../services/api';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    visitorName: '',
    rating: 5,
    comment: ''
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
      await api.post('/feedback', formData);
      alert('Feedback submitted successfully!');
      setFormData({ visitorName: '', rating: 5, comment: '' });
    } catch (error) {
      alert('Error submitting feedback');
    }
  };

  return (
    <animated.div style={{ ...formContainerStyle, ...formAnimation }}>
      <h2 style={headerStyle}>Submit Feedback</h2>
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
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Your feedback"
          required
          style={textareaStyle}
        ></textarea>
        <button type="submit" style={buttonStyle}>Submit Feedback</button>
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

const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
  resize: 'vertical',
  minHeight: '100px'
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

export default FeedbackForm;

