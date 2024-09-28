import React from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CButton, CBadge } from '@coreui/react';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';
import alertify from 'alertifyjs';

const BooksTable = ({ columns, data, handleEdit, handleDelete, handleChangeStatus }) => {
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
        {data.map((book, index) => (
          <CTableRow key={book._id}>
            <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
            <CTableDataCell>{book.name}</CTableDataCell>
            <CTableDataCell>{book.isbn || 'N/A'}</CTableDataCell>
            <CTableDataCell> {book.authorId ? (book.authorId.firstname + ' ' + book.authorId.lastname) : 'N/A'}</CTableDataCell>
            <CTableDataCell>{book.publisher || 'N/A'}</CTableDataCell>
            <CTableDataCell> {book.library ? book.library.name : 'N/A'}</CTableDataCell>
            <CTableDataCell>{book.category || 'N/A'}</CTableDataCell>
            <CTableDataCell className="text-center">
              <CBadge color={book.is_active ? 'success' : 'danger'}>
                {book.is_active ? 'active' : 'inactive'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton className='me-1' color="warning" size="sm" onClick={() => handleEdit(book._id)}>
                <PencilSquare /> Edit
              </CButton>
              <CButton className='me-1' color="info" size="sm" onClick={() => handleChangeStatus(book._id)}>
                <Eye /> Status
              </CButton>
              <CButton className='me-1' color="danger" size="sm" onClick={() => handleDelete(book._id)}>
                <Trash /> Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default BooksTable;
