import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#2C3E50', // Modern dark blue background
    color: '#FFFFFF', // White text color
    display: 'flex',
    justifyContent: 'flex-end', // Align to the right
    alignItems: 'center',
    padding: '10px 20px',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    // boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box', // Prevent content overflow
    whiteSpace: 'nowrap', // Keep everything on a single line
  };

  const linkStyle = {
    color: '#FFFFFF',
    textDecoration: 'none',
    marginLeft: '15px', // Ensure spacing between items
    transition: 'color 0.3s',
  };

  const linkHoverStyle = {
    color: '#BDC3C7', // Lighter grey on hover
  };

  return (
    <footer style={footerStyle}>
      {/* Footer Text */}
      <div>
        <a
          href="http://localhost:3000/reactflow"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)}
          onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
        >
          ReactFlow.com
        </a>
        <a
          href="/status"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)}
          onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
        >
          Platform Status & Announcements
        </a>
        <span style={{ marginLeft: '15px' }}>© Copyright 2024 Reactflow, Inc.</span>
        <a
          href="/privacy"
          style={{ ...linkStyle, marginRight: '10px' }} // Adjust margin for spacing
          onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)}
          onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
        >
          Privacy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
