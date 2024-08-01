import React from 'react';
import { CTableHead, CTableRow, CTableHeaderCell } from '@coreui/react';

const TableHead = ({ columns }) => {
  return (
    <CTableHead className="text-nowrap">
      <CTableRow>
        {columns.map((column, index) => (
          <CTableHeaderCell key={index} className="bg-body-tertiary text-center">
            {column}
          </CTableHeaderCell>
        ))}
      </CTableRow>
    </CTableHead>
  );
};

export default TableHead;
