import React from 'react';
import Projects from '../components/Landing/Projects';
import Clients from '../components/Landing/Clients';
import ContactForm from '../components/Landing/ContactForm';
import Newsletter from '../components/Landing/Newsletter';

const LandingPage = () => {
  return (
    <div>
      <Projects />
      <Clients />
      <ContactForm />
      <Newsletter />
    </div>
  );
};

export default LandingPage;