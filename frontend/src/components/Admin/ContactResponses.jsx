import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ContactResponses = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/contacts`);
      setContacts(response.data.contacts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return <div className="loading">Loading contact responses...</div>;
  }

  return (
    <div className="admin-section">
      <h2>Contact Form Responses ({contacts.length})</h2>
      
      {contacts.length === 0 ? (
        <p>No contact responses yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{formatDate(contact.createdAt)}</td>
                  <td>{contact.fullName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.mobile}</td>
                  <td>{contact.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactResponses;