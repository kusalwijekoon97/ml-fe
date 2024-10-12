// src\components\dashboard\CountWidgetSection.js

import React from 'react';
import UserCountCard from './UserCountCard';
import { CRow } from '@coreui/react';

const CountWidgetSection = ({
}) => {
  return (
    <>
      <CRow>
        <UserCountCard />
      </CRow>
    </>
  );
};

export default CountWidgetSection;
