import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SubscribersList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/subscribers`);
      setSubscribers(response.data.subscribers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return <div className="loading">Loading subscribers...</div>;
  }

  return (
    <div className="admin-section">
      <h2>Newsletter Subscribers ({subscribers.length})</h2>
      
      {subscribers.length === 0 ? (
        <p>No subscribers yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Email</th>
                <th>Subscribed Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr key={subscriber._id}>
                  <td>{index + 1}</td>
                  <td>{subscriber.email}</td>
                  <td>{formatDate(subscriber.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscribersList;