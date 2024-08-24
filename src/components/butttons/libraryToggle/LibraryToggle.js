import React, { useEffect, useState } from 'react';
import './LibraryToggle.css';

const LibraryToggle = ({ checked, onChange }) => {
  const [state, setState] = useState('All');

  useEffect((newState) => {
    if (onChange) onChange(state);
    console.log(state);
  }, [state, onChange]);

  const handleStateChange = (newState) => {
    // Update the state and call the onChange callback
    setState(newState);
    if (onChange) onChange(newState);
    // navigate(`/${selectedLibrary}/categories`);
    console.log(newState);
  };

  return (
    <div className="three-state-toggle">
      <div className="options">
        <span className={`option-item ${state === 'All' ? 'active' : ''}`}
          onClick={() => handleStateChange('All')}>
          All
        </span>
        <span className={`option-item ${state === 'SI' ? 'active' : ''}`}
          onClick={() => handleStateChange('SI')}>
          SI
        </span>
        <span className={`option-item ${state === 'EN' ? 'active' : ''}`}
          onClick={() => handleStateChange('EN')}>
          EN
        </span>
      </div>
      <div className={`toggle-switch ${state === 'All' ? 'left' : state === 'SI' ? 'center' : 'right'}`}
        onClick={() => handleStateChange(state === 'All' ? 'SI' : state === 'SI' ? 'EN' : 'All')}>
        <span className="slider-label">{state}</span>
      </div>
    </div>
  );
};

export default React.memo(LibraryToggle);
