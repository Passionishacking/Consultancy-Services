import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/clients`);
      setClients(response.data.clients);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading clients...</div>;
  }

  return (
    <section className="section" style={{ background: '#f5f5f5' }}>
      <div className="container">
        <h2 className="section-title">Happy Clients</h2>
        <div className="grid">
          {clients.map((client) => (
            <div key={client._id} className="card">
              <img 
                src={`${API_URL}${client.image}`} 
                alt={client.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/450x350?text=No+Image';
                }}
              />
              <div className="card-content">
                <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                  "{client.description}"
                </p>
                <h3>{client.name}</h3>
                <p className="designation">{client.designation}</p>
              </div>
            </div>
          ))}
        </div>
        {clients.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>No client testimonials available yet.</p>
        )}
      </div>
    </section>
  );
};

export default Clients;