import React from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CButton, CBadge } from '@coreui/react';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';

const LibrariansTable = ({ columns, data, handleEdit, handleDelete, handleChangeStatus }) => {
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
            <CTableDataCell>{librarian.nic}</CTableDataCell>
            <CTableDataCell>{librarian.address}</CTableDataCell>
            <CTableDataCell>{librarian.phone}</CTableDataCell>
            <CTableDataCell>{librarian.email}</CTableDataCell>
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
