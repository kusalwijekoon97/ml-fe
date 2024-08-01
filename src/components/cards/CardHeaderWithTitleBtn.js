import React from 'react';
import { CCardHeader, CButton } from '@coreui/react';
import { Link } from 'react-router-dom';

const CardHeaderWithTitleBtn = ({ title, subtitle, buttonIcon, buttonText, linkTo }) => {
  return (
    <CCardHeader className="d-flex justify-content-between align-items-center">
      <div>
        <strong>{title}</strong> <small>{subtitle}</small>
      </div>
      <Link to={linkTo}>
        <CButton color="primary" size="sm" className="ms-auto">
          {buttonIcon} {buttonText}
        </CButton>
      </Link>
    </CCardHeader>
  );
};

export default CardHeaderWithTitleBtn;
