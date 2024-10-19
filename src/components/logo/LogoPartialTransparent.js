import React from 'react';
import logoPartialTransparent from "../../assets/images/logo/logoPartialTransparent.png";

const LogoPartialTransparent = ({ width, height = "auto", styles }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={logoPartialTransparent}
        alt="Logo"
        loading="lazy"
        style={{
          width: width,
          height: height,
          // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '100%',
          ...styles,
        }}
      />
    </div>
  );
};

export default LogoPartialTransparent;
