import React from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CButton, CBadge } from '@coreui/react';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';

const LibrariansTable = ({ columns, data, handleEdit, handleDelete, handleChangeStatus }) => {
  // Function to format permissions object into a readable string
  const formatPermissions = (permissions) => {
    return (
      <ul style={{ padding: 0, margin: 0 }}>
        {Object.entries(permissions).map(([key, value]) => (
          value ? <li key={key}>{key}</li> : null
        ))}
      </ul>
    );
  };

  return (
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
        {data.map((librarian, index) => (
          <CTableRow key={librarian._id}>
            <CTableDataCell>{index + 1}</CTableDataCell>
            <CTableDataCell>{librarian.firstName} {librarian.lastName}</CTableDataCell>
            <CTableDataCell>{librarian.email}</CTableDataCell>
            <CTableDataCell>
              {librarian.libraries && librarian.libraries.length > 0 ? (
                librarian.libraries.map((lib, index) => (
                  <CBadge key={lib._id} color="secondary" className="me-1">{lib.name}</CBadge>
                ))
              ) : (
                <span className="d-flex align-items-center">
                  <CIcon icon={cilWarning} className="me-2 text-warning" /> No Libraries
                </span>
              )}
            </CTableDataCell>
            <CTableDataCell>
              {formatPermissions(librarian.permissions)}
            </CTableDataCell>
            <CTableDataCell>
              <CBadge color={librarian.is_active ? 'success' : 'danger'}>
                {librarian.is_active ? 'active' : 'inactive'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton className='me-1' color="warning" size="sm" onClick={() => handleEdit(librarian._id)}>
                <PencilSquare /> Edit
              </CButton>
              <CButton className='me-1' color="info" size="sm" onClick={() => handleChangeStatus(librarian._id)}>
                <Eye /> Status
              </CButton>
              <CButton className='me-1' color="danger" size="sm" onClick={() => handleDelete(librarian._id)}>
                <Trash /> Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default LibrariansTable;
