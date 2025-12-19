import React from 'react';
import AddProject from '../components/Admin/AddProject';
import AddClient from '../components/Admin/AddClient';
import ContactResponses from '../components/Admin/ContactResponses';
import SubscribersList from '../components/Admin/SubscribersList';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <div className="container">
        <h1 style={{ 
          textAlign: 'center', 
          margin: '2rem 0',
          fontSize: '2.5rem',
          color: '#333'
        }}>
          Admin Panel
        </h1>
        
        <AddProject />
        <AddClient />
        <ContactResponses />
        <SubscribersList />
      </div>
    </div>
  );
};

export default AdminPanel;