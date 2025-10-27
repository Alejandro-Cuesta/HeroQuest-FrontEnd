import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notfound-page">
      <h2>404 - Page Not Found</h2>
      <p>Looks like you took a wrong turn in the dungeon...</p>
      <Link to="/home" className="notfound-page__link">🏠 Go Back Home</Link>
    </div>
  );
};

export default NotFound;