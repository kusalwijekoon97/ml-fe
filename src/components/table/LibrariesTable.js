import React from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CButton, CBadge } from '@coreui/react';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';

const LibrariesTable = ({ columns, data, handleEdit, handleDelete, handleChangeStatus }) => {
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
        {data.map((library, index) => (
          <CTableRow key={library._id}>
            <CTableDataCell>{index + 1}</CTableDataCell>
            <CTableDataCell>{library.name}</CTableDataCell>
            <CTableDataCell>{library.librarian ?? "N/A"}</CTableDataCell>
            <CTableDataCell>
            <CBadge color={library.is_active ? 'success' : 'danger'}>
                {library.is_active ? 'active' : 'inactive'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton className='me-1' color="warning" size="sm" onClick={() => handleEdit(library._id)}>
                <PencilSquare /> Edit
              </CButton>
              <CButton className='me-1' color="info" size="sm" onClick={() => handleChangeStatus(library._id)}>
                <Eye /> Status
              </CButton>
              <CButton className='me-1' color="danger" size="sm" onClick={() => handleDelete(library._id)}>
                <Trash /> Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default LibrariesTable;
