import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_URL}/api/contacts`, formData);
      
      if (response.data.success) {
        setMessage('Thank you! Your message has been sent successfully.');
        setFormData({
          fullName: '',
          email: '',
          mobile: '',
          city: ''
        });
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="form-container">
          {message && (
            <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile *</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;