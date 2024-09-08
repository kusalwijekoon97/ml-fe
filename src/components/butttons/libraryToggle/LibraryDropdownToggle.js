import { CFormSelect } from '@coreui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './LibraryDropdownToggle.css';
import base_url from '../../../utils/api/base_url';

const LibraryDropdownToggle = ({ checked, onChange }) => {
  const [libraryOptions, setLibraryOptions] = useState([]);

  useEffect(() => {
    // Fetch libraries from API
    axios.get(`${base_url}/api/libraries/all-open`)
      .then(response => {
        const libraries = response.data.data.map(library => ({
          value: library._id,
          label: library.name
        }));
        setLibraryOptions(libraries);
      })
      .catch(error => {
        console.error("There was an error fetching the libraries!", error);
      });
  }, []);

  const handleLibraryChange = (selectedOptions) => {
    onChange(selectedOptions); // Make sure to call the onChange prop
  };

  return (
    <div className="library-dropdown mb-2 p-2">
      <CFormSelect
        id="library"
        name="library"
        options={libraryOptions}
        onChange={handleLibraryChange}
      />
    </div>
  );
};

export default React.memo(LibraryDropdownToggle);
