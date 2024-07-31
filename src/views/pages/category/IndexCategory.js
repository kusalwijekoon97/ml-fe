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

const IndexCategory = () => {
  const [categories, setCategories] = useState([]);

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

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CContainer className="px-1" lg>
            <CRow>
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CCardHeader>
                    <strong>Categories</strong> <small>List</small>
                  </CCardHeader>
                  <CCardBody>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                      <CTableHead className="text-nowrap">
                        <CTableRow>
                          <CTableHeaderCell className="bg-body-tertiary text-center">
                            #
                          </CTableHeaderCell>
                          <CTableHeaderCell className="bg-body-tertiary">Category Name</CTableHeaderCell>
                          <CTableHeaderCell className="bg-body-tertiary text-center">
                            Active Status
                          </CTableHeaderCell>
                          <CTableHeaderCell className="bg-body-tertiary">Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {categories.map((category, index) => (
                          <CTableRow key={category._id}>
                            <CTableDataCell className="text-center">
                              {index + 1}
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{category.name}</div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <CBadge color={category.is_active ? 'success' : 'danger'}>
                                {category.is_active ? 'Active' : 'Inactive'}
                              </CBadge>
                            </CTableDataCell>
                            <CTableDataCell>
                              <CButton color="primary" size="sm" onClick={() => handleEdit(category._id)}>
                                Edit
                              </CButton>{' '}
                              <CButton color="danger" size="sm" onClick={() => handleDelete(category._id)}>
                                Delete
                              </CButton>{' '}
                              <CButton color="warning" size="sm" onClick={() => handleChangeStatus(category._id)}>
                                Change Status
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
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
