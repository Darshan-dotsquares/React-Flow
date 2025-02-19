'use client';
import React, { useState } from 'react';

function SecondaryNavbar() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const secondaryNavStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    backgroundColor: 'white',
    borderBottom: '1px solid lightgray',
    padding: '10px 20px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
  };

  const navItemStyle = {
    cursor: 'pointer',
    position: 'relative',
    paddingBottom: '8px',
    color: '#333', // Default dark text
  };

  const activeNavItemStyle = {
    borderBottom: '2px solid black',
    fontWeight: 'bold',
    color: 'black',
  };

  const lightBlackStyle = {
    color: '#666', // Lighter black for "Integration"
  };

  return (
    <div style={secondaryNavStyle}>
      {/* "Integration" with Lighter Black Text */}
      <div style={{ ...navItemStyle, ...lightBlackStyle }}>Integration</div>

      {/* Other Menu Items */}
      {['Dashboard', 'Build', 'Deploy', 'Manage'].map((item) => (
        <div
          key={item}
          style={
            activeItem === item
              ? { ...navItemStyle, ...activeNavItemStyle }
              : navItemStyle
          }
          onClick={() => setActiveItem(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default SecondaryNavbar;
