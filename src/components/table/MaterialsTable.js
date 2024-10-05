import React from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CButton, CBadge } from '@coreui/react';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';
import alertify from 'alertifyjs';

const MaterialsTable = ({ columns, data, handleEdit, handleDelete, handleChangeStatus }) => {
  const baseURL = 'https://bckt-mylibrary-testing.s3.ap-south-1.amazonaws.com/';

  // Function to get the shortened material path
  const getShortenedPath = (fullPath) => {
    if (fullPath && fullPath.startsWith(baseURL)) {
      return '.../' + fullPath.slice(baseURL.length);
    }
    return fullPath || 'N/A'; // Return the original if not matching base URL
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
        {data.map((material, index) => (
          <CTableRow key={material._id}>
            <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
            <CTableDataCell>{material.material_path || 'N/A'}</CTableDataCell>
            {/* <CTableDataCell>{getShortenedPath(material.material_path)}</CTableDataCell> */}
            <CTableDataCell className="text-center">
              <CBadge color={material.is_active ? 'success' : 'danger'}>
                {material.is_active ? 'active' : 'inactive'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton className='me-1' color="warning" size="sm" onClick={() => handleEdit(material._id)}>
                <PencilSquare /> Edit
              </CButton>
              <CButton className='me-1' color="info" size="sm" onClick={() => handleChangeStatus(material._id)}>
                <Eye /> Status
              </CButton>
              <CButton className='me-1' color="danger" size="sm" onClick={() => handleDelete(material._id)}>
                <Trash /> Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default MaterialsTable;
