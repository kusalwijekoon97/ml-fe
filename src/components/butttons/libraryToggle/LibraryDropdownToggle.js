import { CFormSelect } from '@coreui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './LibraryDropdownToggle.css';
import base_url from '../../../utils/api/base_url';

const LibraryDropdownToggle = ({ checked, onChange, onLibraryChange }) => {
  const [libraryOptions, setLibraryOptions] = useState([{ value: '', label: '-- All --' }]);
  const [currentActiveLibrary, setCurrentActiveLibrary] = useState('');

  useEffect(() => {
    // Fetch libraries from API
    axios.get(`${base_url}/api/libraries/all-open`)
      .then(response => {
        const libraries = response.data.data.map(library => ({
          value: library._id,
          label: library.name
        }));
        // Add default option to the libraries list
        setLibraryOptions([{ value: '', label: '-- All --' }, ...libraries]);
      })
      .catch(error => {
        console.error("There was an error fetching the libraries!", error);
      });

    const currentActiveLibrary = sessionStorage.getItem('currentActiveLibrary');
    if (currentActiveLibrary) {
      setCurrentActiveLibrary(currentActiveLibrary);
    }
  }, []);

  const handleLibraryChange = (e) => {
    const selectedOption = e.target.value;
    setCurrentActiveLibrary(selectedOption);
    sessionStorage.setItem('currentActiveLibrary', selectedOption);

    // Notify parent component of the library change
    if (onLibraryChange) {
      onLibraryChange(selectedOption);
    }
  };

  return (
    <>
      <div className="library-dropdown mb-2 p-2">
        <CFormSelect
          id="library"
          name="library"
          value={currentActiveLibrary}
          onChange={handleLibraryChange}
        >
          {libraryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </CFormSelect>
      </div>
    </>
  );
};

export default React.memo(LibraryDropdownToggle);
