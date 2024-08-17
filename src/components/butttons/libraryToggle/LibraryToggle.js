import React, { useState } from 'react';
import './LibraryToggle.css';

const LibraryToggle = ({ checked, onChange }) => {
  const [state, setState] = useState(checked || 'All'); // Initialize with the passed checked prop or 'All'

  const handleStateChange = () => {
    // Cycle through the states: All -> SI -> EN -> All
    let newState;
    if (state === 'All') newState = 'SI';
    else if (state === 'SI') newState = 'EN';
    else newState = 'All';

    setState(newState);
    if (onChange) onChange(newState);
    console.log(newState);
  };

  return (
    <div className="three-state-toggle">
      <div className="options">
        <span className={`option-item ${state === 'All' ? 'active' : ''}`}>All</span>
        <span className={`option-item ${state === 'SI' ? 'active' : ''}`}>SI</span>
        <span className={`option-item ${state === 'EN' ? 'active' : ''}`}>EN</span>
      </div>
      <div
        className={`toggle-switch ${state === 'All' ? 'left' : state === 'SI' ? 'center' : 'right'}`}
        onClick={handleStateChange}
      >
        <span className="slider-label">{state}</span>
      </div>
    </div>
  );
};

export default React.memo(LibraryToggle);
