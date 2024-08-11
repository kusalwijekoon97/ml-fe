import React, { useState, useEffect } from 'react';
import {CCard,CCardBody,CContainer,CRow,CCol,CSpinner} from '@coreui/react';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import LibraryFormEdit from '../../../components/forms/LibraryFormEdit';

const EditLibrary = () => {
  const navigate = useNavigate();
  const { libraryId } = useParams();

  const [form, setForm] = useState({
    name: ''
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });
  const [errors, setErrors] = useState({
    name: ''
  });

  useEffect(() => {
    const fetchLibraryData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/api/libraries/${libraryId}`);
        const data = response.data.data; // Ensure you access the correct data property
        setForm({
          name: data.name || ''
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Failed to load library data. Please try again.'
        });
        console.error(error);
      }
    };

    fetchLibraryData();
  }, [libraryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = 'First name is mandatory.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    axios.post(`${base_url}/api/libraries/update/${libraryId}`, form)
      .then(response => {
        setLoading(false);
        navigate("/libraries", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Library updated successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Library update failed. Please try again.'
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
        <AppHeader title="Libraries" />
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
                    title="Library"
                    subtitle="edit"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Libraries"
                    linkTo="/libraries"
                  />
                  <CCardBody>
                    <LibraryFormEdit
                      form={form}
                      errors={errors}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      handlePrevious={handlePrevious}
                      loading={loading}
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

export default EditLibrary;
