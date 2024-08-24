import React, { useState } from 'react';
import { CCard, CCardBody, CContainer, CRow, CCol, CSpinner } from '@coreui/react';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';
import { Link, useNavigate } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import AuthorForm from '../../../components/forms/AuthorForm';

const CreateMaterial = () => {
  const navigate = useNavigate();

  const diedOptions = [
    { value: '', label: 'Select...' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  // Handle change for the react-select component
  const handleDiedChange = (selectedOption) => {
    handleChange({
      target: {
        name: 'died',
        value: selectedOption ? selectedOption.value : ''
      }
    });
  };

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    died: 'no',
    penName: '',
    nationality: '',
    firstPublishDate: '',
    description: '',
    profileImage: null,
    position: '',
    income: ''
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    died: '',
    penName: '',
    nationality: '',
    firstPublishDate: '',
    description: '',
    profileImage: '',
    position: '',
    income: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, profileImage: e.target.files[0] });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstname) newErrors.firstname = 'First name is mandatory.';
    if (!form.lastname) newErrors.lastname = 'Last name is mandatory.';
    if (!form.penName) newErrors.penName = 'Pen name is mandatory.';
    if (!form.nationality) newErrors.nationality = 'Nationality is mandatory.';
    if (!form.firstPublishDate) newErrors.firstPublishDate = 'First publish date is mandatory.';
    if (!form.description) newErrors.description = 'Description is mandatory.';
    if (!form.profileImage) newErrors.profileImage = 'Profile image is mandatory.';
    if (!form.position) newErrors.position = 'Position is mandatory.';
    if (!form.income) newErrors.income = 'Income is mandatory.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('firstname', form.firstname);
    formData.append('lastname', form.lastname);
    formData.append('died', form.died);
    formData.append('penName', form.penName);
    formData.append('nationality', form.nationality);
    formData.append('firstPublishDate', form.firstPublishDate);
    formData.append('description', form.description);
    formData.append('profileImage', form.profileImage);
    formData.append('position', form.position);
    formData.append('income', form.income);

    axios.post(`${base_url}/api/authors/store`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setLoading(false);
        navigate("/authors", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Author created successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Author creation failed. Please try again.'
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
        <AppHeader title="Authors" />
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
                    title="Author"
                    subtitle="create"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Authors"
                    linkTo="/authors"
                  />
                  <CCardBody>
                    <AuthorForm
                      form={form}
                      errors={errors}
                      diedOptions={diedOptions}
                      handleDiedChange={handleDiedChange}
                      handleChange={handleChange}
                      handleFileChange={handleFileChange}
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

export default CreateMaterial;
