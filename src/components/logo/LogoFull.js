import React from 'react';
import logoFullTransparent from "../../assets/images/logo/logoFullTransparent.png";

const LogoFull = ({ width, height = "auto", styles }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={logoFullTransparent}
        alt="Logo"
        style={{
          width: width,
          height: height, // Responsive height
          // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '100%',
          ...styles,
        }}
      />
    </div>
  );
};

export default LogoFull;
