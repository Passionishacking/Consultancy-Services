import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AddClient = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    designation: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('designation', formData.designation);
    data.append('image', image);

    try {
      const response = await axios.post(`${API_URL}/api/clients`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setMessage('Client added successfully!');
        setFormData({ name: '', description: '', designation: '' });
        setImage(null);
        document.getElementById('client-image').value = '';
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding client. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <h2>Add New Client Testimonial</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="client-name">Client Name *</label>
          <input
            type="text"
            id="client-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="client-description">Testimonial *</label>
          <textarea
            id="client-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What did the client say about your work?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="client-designation">Designation *</label>
          <input
            type="text"
            id="client-designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="e.g., CEO at Company Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="client-image">Client Photo * (will be cropped to 450x350)</label>
          <input
            type="file"
            id="client-image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Adding...' : 'Add Client'}
        </button>
      </form>
    </div>
  );
};

export default AddClient;