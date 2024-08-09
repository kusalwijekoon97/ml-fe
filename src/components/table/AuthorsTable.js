import React from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CButton, CBadge } from '@coreui/react';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';
import alertify from 'alertifyjs';

const AuthorsTable = ({ columns, data, handleEdit, handleDelete, handleChangeStatus }) => {
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
        {data.map((author, index) => (
          <CTableRow key={author._id}>
            <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
            <CTableDataCell>{author.firstname} {author.lastname}</CTableDataCell>
            <CTableDataCell>{author.penName || 'N/A'}</CTableDataCell>
            <CTableDataCell>{author.nationality || 'N/A'}</CTableDataCell>
            <CTableDataCell>{author.income || 'N/A'}</CTableDataCell>
            <CTableDataCell>{author.firstPublishDate || 'N/A'}</CTableDataCell>
            <CTableDataCell>{author.position || 'N/A'}</CTableDataCell>
            <CTableDataCell className="text-center">
              <CBadge color={author.is_active ? 'success' : 'danger'}>
                {author.is_active ? 'active' : 'inactive'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton className='me-1' color="warning" size="sm" onClick={() => handleEdit(author._id)}>
                <PencilSquare /> Edit
              </CButton>
              <CButton className='me-1' color="info" size="sm" onClick={() => handleChangeStatus(author._id)}>
                <Eye /> Status
              </CButton>
              <CButton className='me-1' color="danger" size="sm" onClick={() => handleDelete(author._id)}>
                <Trash /> Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default AuthorsTable;
