import React from 'react';
import { CTableBody, CTableRow, CTableDataCell, CButton, CBadge } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWarning } from '@coreui/icons';
import { Eye, PencilSquare, Trash } from 'react-bootstrap-icons';

const TableBody = ({ data, handleEdit, handleDelete, handleChangeStatus }) => {
  return (
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
          <CTableDataCell className="text-center">
            <CBadge color={item.is_active ? 'success' : 'danger'}>
              {item.is_active ? 'active' : 'inactive'}
            </CBadge>
          </CTableDataCell>
          <CTableDataCell>
            <CButton color="primary" size="sm" onClick={() => handleEdit(item._id)}>
              <PencilSquare /> Edit
            </CButton>{' '}
            <CButton color="warning" size="sm" onClick={() => handleChangeStatus(item._id)}>
              <Eye /> Change Status
            </CButton>
            {' '}
            <CButton color="danger" size="sm" onClick={() => handleDelete(item._id)}>
              <Trash /> Delete
            </CButton>
          </CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  );
};

export default TableBody;
