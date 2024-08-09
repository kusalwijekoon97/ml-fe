// src\components\table\Table.js
import React from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CButton, CBadge } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWarning } from '@coreui/icons';
import { Eye, PencilSquare, Trash } from 'react-bootstrap-icons';
import alertify from 'alertifyjs';

const CategoriesTable = ({ columns, data, handleEdit, handleDelete, handleChangeStatus }) => {
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
        {data.map((item, index) => (
          <CTableRow key={item._id}>
            <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
            <CTableDataCell>{item.name}</CTableDataCell>
            <CTableDataCell>
              {item.subCategories.length > 0 ? (
                <ul>
                  {item.subCategories.map((sub) => (
                    <li key={sub._id}>{sub.name}</li>
                  ))}
                </ul>
              ) : (
                <span className="d-flex align-items-center">
                  <CIcon icon={cilWarning} className="me-2 text-warning" /> No Subcategories
                </span>
              )}
            </CTableDataCell>
            <CTableDataCell>
              {item.library.length > 0 ? (
                <ul>
                  {item.library.map((lib, index) => (
                    <CBadge color="secondary" className='me-1' key={index}>{lib}</CBadge>
                  ))}
                </ul>
              ) : (
                <span className="d-flex align-items-center">
                  <CIcon icon={cilWarning} className="me-2 text-warning" /> No Libraries
                </span>
              )}
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <CBadge color={item.is_active ? 'success' : 'danger'}>
                {item.is_active ? 'active' : 'inactive'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton className='me-1' color="warning" size="sm" onClick={() => handleEdit(item._id)}>
                <PencilSquare /> Edit
              </CButton>
              <CButton className='me-1' color="info" size="sm" onClick={() => handleChangeStatus(item._id)}>
                <Eye /> Status
              </CButton>

              <CButton className='me-1' color="danger" size="sm" onClick={() => handleDelete(item._id)}>
                <Trash /> Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default CategoriesTable;
