import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_URL}/api/subscribers`, { email });
      
      if (response.data.success) {
        setMessage('Successfully subscribed to our newsletter!');
        setEmail('');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error subscribing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <h2>Subscribe to Our Newsletter</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Get the latest updates and news delivered to your inbox
        </p>
        
        {message && (
          <div style={{ 
            background: message.includes('Error') ? '#ff5252' : '#4caf50',
            color: 'white',
            padding: '0.8rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            maxWidth: '500px',
            margin: '0 auto 1rem'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;