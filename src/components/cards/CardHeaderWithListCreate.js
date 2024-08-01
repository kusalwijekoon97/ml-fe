import React from 'react';
import { CCardHeader, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cibAddthis } from '@coreui/icons';

const CardHeaderWithListCreate = ({ title, subtitle, buttonText, buttonOnClick }) => {
  return (
    <CCardHeader className="d-flex justify-content-between align-items-center">
      <div>
        <strong>{title}</strong> <small>{subtitle}</small>
      </div>
      <CButton color="primary" size="sm" className="ms-auto" onClick={buttonOnClick}>
      <CIcon icon={cibAddthis} /> {buttonText}
      </CButton>
    </CCardHeader>
  );
};

export default CardHeaderWithListCreate;
