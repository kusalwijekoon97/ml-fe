import React from 'react';
import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilXCircle } from '@coreui/icons';

const ResponseAlert = ({ visible, type, message, onClose }) => {
  // Determine the icon and color based on the type of notification
  const icon = type === 'success' ? cilCheckCircle : cilXCircle;
  const color = type === 'success' ? 'success' : 'danger';
  const title = type === 'success' ? 'Success' : 'Failure';

  return (
    <CToaster position="top-end">
      <CToast
        autohide={true}
        visible={visible}
        onClose={onClose}
        className="position-fixed top-0 end-0 m-3"
        delay={3000} // Auto-hide delay in milliseconds (3000ms = 3s)
      >
        <CToastHeader closeButton>
          <CIcon icon={icon} className={`rounded me-2 text-${color}`} />
          <div className="fw-bold me-auto">{title}</div>
        </CToastHeader>
        <CToastBody>{message}</CToastBody>
      </CToast>
    </CToaster>
  );
};

export default ResponseAlert;
