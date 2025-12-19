import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`);
      setProjects(response.data.projects);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Our Projects</h2>
        <div className="grid">
          {projects.map((project) => (
            <div key={project._id} className="card">
              <img 
                src={`${API_URL}${project.image}`} 
                alt={project.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/450x350?text=No+Image';
                }}
              />
              <div className="card-content">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          ))}
        </div>
        {projects.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>No projects available yet.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;