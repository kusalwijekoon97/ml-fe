import React from 'react';
import logoFullWhite from "../../assets/images/logo/logoFullWhite.jpg";

const LogoFullWhite = ({ width, height = "auto", styles }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={logoFullWhite}
        alt="Logo"
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

export default LogoFullWhite;
