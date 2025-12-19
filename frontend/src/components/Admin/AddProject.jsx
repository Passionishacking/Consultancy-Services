import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
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
    data.append('image', image);

    try {
      const response = await axios.post(`${API_URL}/api/projects`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setMessage('Project added successfully!');
        setFormData({ name: '', description: '' });
        setImage(null);
        document.getElementById('project-image').value = '';
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <h2>Add New Project</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="project-name">Project Name *</label>
          <input
            type="text"
            id="project-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="project-description">Description *</label>
          <textarea
            id="project-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="project-image">Project Image * (will be cropped to 450x350)</label>
          <input
            type="file"
            id="project-image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Adding...' : 'Add Project'}
        </button>
      </form>
    </div>
  );
};

export default AddProject;