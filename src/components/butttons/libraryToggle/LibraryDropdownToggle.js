import { CFormSelect } from '@coreui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './LibraryDropdownToggle.css';
import base_url from '../../../utils/api/base_url';

const LibraryDropdownToggle = ({ checked, onChange }) => {
  const [libraryOptions, setLibraryOptions] = useState([{ value: '', label: '-- All --' }]);
  const [selectedLibrary, setSelectedLibrary] = useState('');

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

      const storedLibrary = sessionStorage.getItem('selectedLibrary');
      console.log(storedLibrary);

        if (storedLibrary) {
          setSelectedLibrary(storedLibrary);
        }

  }, []);

  const handleLibraryChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedLibrary(selectedOption);

    // Store selected library in sessionStorage
    sessionStorage.setItem('selectedLibrary', selectedOption);
  };

  return (
    <div className="library-dropdown mb-2 p-2">
      <CFormSelect
        id="library"
        name="library"
        value={selectedLibrary} // Set the value from state
        onChange={handleLibraryChange}
      >
        {libraryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </CFormSelect>
    </div>
  );
};

export default React.memo(LibraryDropdownToggle);
