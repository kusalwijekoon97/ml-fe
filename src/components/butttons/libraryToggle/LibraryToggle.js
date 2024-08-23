import React, { useEffect, useState } from 'react';
import './LibraryToggle.css';
import { useNavigate } from 'react-router-dom';

const LibraryToggle = ({ checked, onChange }) => {
  const [state, setState] = useState('All');
  const navigate = useNavigate();

  // useEffect((newState) => {
  //   if (onChange) onChange(state);
  //   console.log(state);
  //   navigate(`/${newState}/`);
  // }, [state, onChange]);

  // const handleStateChange = (newState) => {
  //   // Update the state and call the onChange callback
  //   setState(newState);
  //   if (onChange) onChange(newState);
  //   navigate(`/${newState}/`);
  //   console.log(newState);
  // };

  useEffect(() => {
    // Update URL when state changes
    if (state) {
      console.log(state);
      navigate(`/${state}/`);
      if (onChange) onChange(state);
    }
  }, [state, navigate, onChange]);

  const handleStateChange = (newState) => {
    setState(newState.toLowerCase());
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
