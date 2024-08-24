import React, { useEffect, useState } from 'react';
import './LibraryToggle.css';

const LibraryToggle = ({ checked, onChange }) => {
  const [state, setState] = useState('All');

  // useEffect to trigger when 'state' changes
  useEffect(() => {
    // Trigger the callback if provided
    if (onChange) onChange(state);

    // Update session storage
    sessionStorage.setItem('selectedLibrary', state);

    console.log(state);
  }, [state, onChange]);

  // Function to change the state
  const handleStateChange = (newState) => {
    setState(newState); // This will automatically trigger the useEffect
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
