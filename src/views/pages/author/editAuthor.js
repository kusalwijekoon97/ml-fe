import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import AuthorFormEdit from '../../../components/forms/AuthorFormEdit';

const EditAuthor = () => {
  const navigate = useNavigate();
  const { authorId } = useParams();

  const diedOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const [form, setForm] = useState({
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

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/api/authors/${authorId}`);
        const data = response.data.data;
        setForm({
          firstname: data.firstname,
          lastname: data.lastname,
          died: data.died,
          penName: data.penName,
          nationality: data.nationality,
          firstPublishDate: data.firstPublishDate,
          description: data.description,
          position: data.position,
          income: data.income,
          profileImage: data.profileImage
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Failed to load author data. Please try again.'
        });
        console.error(error);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  // const handleFileChange = (e) => {
  //   setForm({ ...form, profileImage: e.target.files[0] });
  // };

  const handleFileChange = (file) => {
    setForm({ ...form, profileImage: file });
  };


  const handleDiedChange = (selectedOption) => {
    handleChange({
      target: {
        name: 'died',
        value: selectedOption ? selectedOption.value : ''
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstname) newErrors.firstname = 'First name is mandatory.';
    if (!form.lastname) newErrors.lastname = 'Last name is mandatory.';
    if (!form.penName) newErrors.penName = 'Pen name is mandatory.';
    if (!form.nationality) newErrors.nationality = 'Nationality is mandatory.';
    if (!form.firstPublishDate) newErrors.firstPublishDate = 'First publish date is mandatory.';
    if (!form.description) newErrors.description = 'Description is mandatory.';
    if (form.profileImage instanceof File) formData.append('profileImage', form.profileImage); // Only append if it's a File object
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
    if (form.profileImage) formData.append('profileImage', form.profileImage);
    formData.append('position', form.position);
    formData.append('income', form.income);

    axios.post(`${base_url}/api/authors/update/${authorId}`, formData, {
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
              message: 'Author updated successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Author update failed. Please try again.'
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
                    subtitle="edit"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Authors"
                    linkTo="/authors"
                  />
                  <CCardBody>
                    <AuthorFormEdit
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

export default EditAuthor;
