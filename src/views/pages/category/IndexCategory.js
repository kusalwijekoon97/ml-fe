import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
} from '@coreui/react';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import base_url from "../../../utils/api/base_url";
import CardHeaderWithListCreate from '../../../components/cards/CardHeaderWithListCreate';
import TableHead from '../../../components/table/TableHead';
import TableBody from '../../../components/table/TableBody';

const IndexCategory = () => {
  const [categories, setCategories] = useState([]);

  const columns = ["#", "Category Name", "Active Status", "Actions"];

  useEffect(() => {
    axios.get(`${base_url}/api/categories/main/all`)
      .then(response => {
        // Ensure response data is an array
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('API response is not an array', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit category with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete category with id: ${id}`);
  };

  const handleChangeStatus = (id) => {
    console.log(`Change status of category with id: ${id}`);
  };

  const handleAddNewItem = () => {
    alert(555);
    console.log('Add new category');
  };

  return (
    <>
      <AppSidebar/>
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader title="Categories" />
        <div className="body flex-grow-1">
          <CContainer className="px-1" lg>
            <CRow>
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CardHeaderWithListCreate
                    title="Categories"
                    subtitle="List"
                    buttonText="Category"
                    buttonOnClick={handleAddNewItem}
                  />
                  <CCardBody>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                      <TableHead columns={columns} />
                      <TableBody
                        data={categories}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleChangeStatus={handleChangeStatus}
                      />
                    </CTable>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default IndexCategory;
