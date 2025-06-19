import React from 'react';
import './Home.css'; // Link to custom CSS

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>🏡 Welcome to ECCP Home</h1>
        <p>
          This is the Elderly Care Coordination Platform.
        </p>
        <p>
          A system designed to streamline care coordination for aging individuals by 
          connecting families, caregivers, healthcare providers, and service vendors.
        </p>
        <p>
          Its main purpose is to make checkups and interactions easier for elderly individuals.
        </p>
        <p>
          Use the menu to log in, register, or view the dashboard.
        </p>
      </div>
    </div>
  );
};

export default Home;
