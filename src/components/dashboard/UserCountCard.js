// src\components\dashboard\UserCountCard.js
import React, { useEffect, useState } from 'react';
import { cilPeople, cilBook } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CCol, CWidgetStatsC } from '@coreui/react';
import './UserCountCard.css';
import base_url from "../../utils/api/base_url";
import axios from 'axios';

const UserCountCard = ({ }) => {
  const [authorCount, setAuthorCount] = useState(0);
  const [librarianCount, setLibrarianCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    // Fetch the author count from the backend API
    const fetchTotalCount = async () => {
      try {
        const response = await axios.get(`${base_url}/api/dashboard/counts`);
        setAuthorCount(response.data.data.countAuthors);
        setLibrarianCount(response.data.data.countLibrarians);
        setBookCount(response.data.data.countBooks);
      } catch (error) {
        console.error('Error fetching author count:', error);
      }
    };

    fetchTotalCount();
  }, []);

  return (
    <>
      <CCol xs={3}>
        <CWidgetStatsC
          className="mb-3 custom-widget-stats"
          icon={<CIcon icon={cilPeople} height={35} />}
          color="info"
          inverse
          title="Authors"
          value={authorCount}
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsC
          className="mb-3 custom-widget-stats"
          icon={<CIcon icon={cilPeople} height={35} />}
          color="primary"
          inverse
          title="Librarians"
          value={librarianCount}
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsC
          className="mb-3 custom-widget-stats"
          icon={<CIcon icon={cilBook} height={35} />}
          color="warning"
          inverse
          title="Books"
          value={bookCount}
        />
      </CCol>
    </>
  );
};

export default UserCountCard;
