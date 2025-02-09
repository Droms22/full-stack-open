import React from 'react';
import { Link } from 'react-router-dom';

const navigationStyle = {
  backgroundColor: 'lightgray',
  padding: 5,
  display: 'flex',
  gap: '1%',
};

const Navigation = ({ username, onLogout }) => {
  return (
    <div style={navigationStyle}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {username} logged in
      <button onClick={onLogout}>logout</button>
    </div>
  );
};

export default Navigation;
