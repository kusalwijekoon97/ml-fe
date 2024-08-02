import React from 'react';
import { CTableBody, CTableRow, CTableDataCell, CButton, CBadge } from '@coreui/react';

const TableBody = ({ data, handleEdit, handleDelete, handleChangeStatus }) => {
  return (
    <CTableBody>
      {data.map((item, index) => (
        <React.Fragment key={item._id}>
          <CTableRow>
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
                'No Subcategories'
              )}
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <CBadge color={item.is_active ? 'success' : 'danger'}>
                {item.is_active ? 'Active' : 'Inactive'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton color="primary" size="sm" onClick={() => handleEdit(item._id)}>
                Edit
              </CButton>{' '}
              <CButton color="danger" size="sm" onClick={() => handleDelete(item._id)}>
                Delete
              </CButton>{' '}
              <CButton color="warning" size="sm" onClick={() => handleChangeStatus(item._id)}>
                Change Status
              </CButton>
            </CTableDataCell>
          </CTableRow>
        </React.Fragment>
      ))}
    </CTableBody>
  );
};

export default TableBody;
