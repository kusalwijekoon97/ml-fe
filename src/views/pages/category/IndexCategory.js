// src\views\pages\category\IndexCategory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cibAddthis } from '@coreui/icons';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import base_url from "../../../utils/api/base_url";
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import DTable from '../../../components/table/DTable'; // Updated import
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const IndexCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });

  const columns = ["#", "Category Name", "Sub Categories", "Library", "Status", "Actions"];

  useEffect(() => {
    axios.get(`${base_url}/api/categories/main/all`)
      .then(response => {
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error('API response is not in the expected format', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
    }
  }, [location.state]);

  const handleEdit = (id) => {
    navigate(`/categories/${id}/edit`);
  };

  const handleDelete = (id) => {
    alertify.confirm(
      'Confirm Delete',
      'Are you sure you want to delete this category?',
      () => {
        axios.post(`${base_url}/api/categories/main/delete/${id}`)
          .then(response => {
            setCategories(categories.filter(category => category._id !== id));
            setAlert({
              visible: true,
              type: 'success',
              message: 'Category deleted successfully!'
            });
          })
          .catch(error => {
            console.error('There was an error deleting the category!', error);
            setAlert({
              visible: true,
              type: 'failure',
              message: 'Failed to delete the category. Please try again.'
            });
          });
      },
      () => {}
    );
  };

  const handleChangeStatus = (id) => {
    alertify.confirm(
      'Confirm Status Change',
      'Are you sure you want to change the status of this category?',
      () => {
        axios.post(`${base_url}/api/categories/main/change-status/${id}`)
          .then(response => {
            setCategories(categories.map(category =>
              category._id === id ? { ...category, is_active: !category.is_active } : category
            ));
            setAlert({
              visible: true,
              type: 'success',
              message: 'Category status changed successfully!'
            });
          })
          .catch(error => {
            console.error('There was an error changing the category status!', error);
            setAlert({
              visible: true,
              type: 'failure',
              message: 'Failed to change the category status. Please try again.'
            });
          });
      },
      () => {
        alertify.message('Status change cancelled');
      }
    )
  };

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader title="Categories" />
        <div className="body flex-grow-1">
          <ResponseAlert
            visible={alert.visible}
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ ...alert, visible: false })}
          />
          <CContainer className="px-1" lg>
            <CRow>
              <CCol xs={12}>
                <CCard className="mb-4 border-top-primary border-top-3">
                  <CardHeaderWithTitleBtn
                    title="Categories"
                    subtitle="List"
                    buttonIcon={<CIcon icon={cibAddthis} />}
                    buttonText="Category"
                    linkTo="/categories/create"
                  />
                  <CCardBody>
                    <DTable
                      columns={columns}
                      data={categories}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleChangeStatus={handleChangeStatus}
                    />
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
