// src/views/pages/category/CreateCategory.js
import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CContainer,
  CRow,
  CCol,
  CSpinner
} from '@coreui/react';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';
import { Link, useNavigate } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';

const CreateCategory = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    library: ''
  });

  const [loading, setLoading] = useState(false); // Add loading state
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${base_url}/api/categories/main/store`, form)
      .then(response => {
        setLoading(false);
        navigate("/categories", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Category created successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Category creation failed. Please try again.'
        });
        console.error(error);
      });
  };

  const handlePrevious = () => {
    navigate(-1);
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
                    title="Category"
                    subtitle="create"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Categories"
                    linkTo="/categories"
                  />
                  <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="name">Category Name</CFormLabel>
                        <CFormInput
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter category name"
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="library">Library</CFormLabel>
                        <CFormInput
                          type="text"
                          id="library"
                          name="library"
                          placeholder="Enter library"
                          value={form.library}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="text-end">
                        <Link to="/dashboard">
                          <CButton type="button"
                            size='sm'
                            color="danger"
                            className="me-2"
                            disabled={loading}>Cancel</CButton>
                        </Link>
                        <CButton type="button"
                          size='sm'
                          color="secondary"
                          className="me-2"
                          onClick={handlePrevious}
                          disabled={loading}>Previous</CButton>
                        <CButton
                          type="submit"
                          size='sm'
                          color="success"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <CSpinner as="span" size="sm" aria-hidden="true" /> Submitting...
                            </>
                          ) : (
                            'Submit'
                          )}
                        </CButton>
                      </div>
                    </CForm>
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

export default CreateCategory;
