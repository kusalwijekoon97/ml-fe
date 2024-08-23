import React, { useEffect, useState } from 'react';
import './LibraryToggle.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LibraryToggle = ({ checked, onChange }) => {
  const [state, setState] = useState('all'); // Use lowercase for state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state) {
      console.log(state);
      navigate(`/${state}`); // Navigate to lowercase state
      dispatch({ type: 'set', selectedLibrary: state });
      if (onChange) onChange(state);
    }
  }, [state, dispatch, navigate, onChange]);

  const handleStateChange = (newState) => {
    const formattedState = newState.toLowerCase(); // Convert to lowercase
    setState(formattedState);
    console.log(formattedState);
  };

  return (
    <div className="three-state-toggle">
      <div className="options">
        <span
          className={`option-item ${state === 'all' ? 'active' : ''}`}
          onClick={() => handleStateChange('all')}>
          All
        </span>
        <span
          className={`option-item ${state === 'si' ? 'active' : ''}`}
          onClick={() => handleStateChange('si')}>
          SI
        </span>
        <span
          className={`option-item ${state === 'en' ? 'active' : ''}`}
          onClick={() => handleStateChange('en')}>
          EN
        </span>
      </div>
      <div
        className={`toggle-switch ${state === 'all' ? 'left' : state === 'si' ? 'center' : 'right'}`}
        onClick={() => handleStateChange(state === 'all' ? 'si' : state === 'si' ? 'en' : 'all')}>
        <span className="slider-label">{state.toUpperCase()}</span> {/* Display uppercase */}
      </div>
    </div>
  );
};

export default React.memo(LibraryToggle);
