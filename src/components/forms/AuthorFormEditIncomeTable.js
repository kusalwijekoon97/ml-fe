import React from 'react';
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CBadge
} from '@coreui/react';

const AuthorFormEditIncomeTable = ({ columns, data }) => {
  // Function to determine badge color based on payment status
  const getBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "danger";
      default:
        return "secondary"; // Default color for unknown status
    }
  };

  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key={index} className="bg-body-tertiary text-center">
                {column}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((payment, index) => (
            <CTableRow key={payment._id}>
              <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
              <CTableDataCell className="text-center">
                {payment.paymentAmount || "N/A"}
              </CTableDataCell>
              <CTableDataCell className="text-center">
                {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "N/A"}
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <CBadge color={getBadgeColor(payment.paymentStatus)}>
                  {payment.paymentStatus || "N/A"}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                {payment.paymentDescription || "N/A"}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default AuthorFormEditIncomeTable;
