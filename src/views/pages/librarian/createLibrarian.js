import React, { useEffect, useState } from 'react';
import {CCard,CCardBody,CContainer,CRow,CCol,CSpinner} from '@coreui/react';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';
import { Link, useNavigate } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import LibrarianForm from '../../../components/forms/LibrarianForm';

const CreateLibrarian = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    email: '',
    phone: '',
    address: '',
    library: [],
    permissions: {
      users: false,
      readers: false,
      categories: false,
      books: false,
      authors: false,
      statics: false,
      sales: false,
      packages: false,
      notifications: false,
      settings: false,
    }
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    email: '',
    phone: '',
    address: '',
    library: '',
  });

  const [libraryOptions, setLibraryOptions] = useState([]);

  useEffect(() => {
    // Fetch libraries from API
    axios.get(`${base_url}/api/libraries/all-open`)
      .then(response => {
        const libraries = response.data.data.map(library => ({
          value: library._id,
          label: library.name
        }));
        setLibraryOptions(libraries);
      })
      .catch(error => {
        console.error("There was an error fetching the libraries!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      permissions: {
        ...prevForm.permissions,
        [name]: checked
      }
    }));
  };

  const handleLibraryChange = (selectedOptions) => {
    setForm({ ...form, library: selectedOptions });
    setErrors({ ...errors, library: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (form.library.length === 0) {
      newErrors.library = 'Library is mandatory.';
    }

    if (!form.firstName) newErrors.firstName = 'First name is mandatory.';
    if (!form.lastName) newErrors.lastName = 'Last name is mandatory.';
    if (!form.nic) newErrors.nic = 'NIC is mandatory.';
    if (!form.email) newErrors.email = 'Email is mandatory.';
    if (!form.phone) newErrors.phone = 'Phone number is mandatory.';
    if (!form.address) newErrors.address = 'Address is mandatory.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    const formattedForm = {
      ...form,
      library: form.library.map(option => option.value)
    };

    axios.post(`${base_url}/api/librarians/store`, formattedForm)
      .then(response => {
        setLoading(false);
        navigate("/librarians", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Librarian created successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Librarian creation failed. Please try again.'
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
        <AppHeader title="Librarians" />
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
                    title="Librarian"
                    subtitle="create"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Librarians"
                    linkTo="/librarians"
                  />
                  <CCardBody>
                    <LibrarianForm
                      form={form}
                      errors={errors}
                      libraryOptions={libraryOptions}
                      handleChange={handleChange}
                      handleLibraryChange={handleLibraryChange}
                      handlePermissionChange={handlePermissionChange}
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

export default CreateLibrarian;
