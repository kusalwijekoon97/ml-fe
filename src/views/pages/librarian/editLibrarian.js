import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CContainer, CRow, CCol, CSpinner } from '@coreui/react';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import LibrarianFormEdit from '../../../components/forms/LibrarianFormEdit';

const EditLibrarian = () => {
  const navigate = useNavigate();
  const { librarianId } = useParams();
  const [libraryOptions, setLibraryOptions] = useState([]);


  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    email: '',
    phone: '',
    address: '',
    libraries: [],
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
    libraries: '',
  });

  useEffect(() => {
    const fetchLibrarianData = async () => {
      try {
        setLoading(true);
        const [librarianResponse, librariesResponse] = await Promise.all([
          axios.get(`${base_url}/api/librarians/${librarianId}`),
          axios.get(`${base_url}/api/libraries/all-open`)
        ]);

        const libraries = librariesResponse.data.data.map(lib => ({
          value: lib._id,
          label: lib.name
        }));

        setLibraryOptions(libraries);

        const data = librarianResponse.data.data;
        setForm({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          nic: data.nic || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          libraries: data.libraries.map(lib => ({
            value: lib._id,
            label: lib.name
          })),
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Failed to load librarian data. Please try again.'
        });
        console.error(error);
      }
    };

    fetchLibrarianData();
  }, [librarianId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleLibraryChange = (selectedOptions) => {
    setForm({ ...form, libraries: selectedOptions });
    setErrors({ ...errors, libraries: '' });
  };

  const validateForm = () => {
    const newErrors = {};

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

    axios.post(`${base_url}/api/librarians/update/${librarianId}`, form)
      .then(response => {
        setLoading(false);
        navigate("/librarians", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Librarian updated successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Librarian update failed. Please try again.'
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
                    subtitle="edit"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Librarians"
                    linkTo="/librarians"
                  />
                  <CCardBody>
                    <LibrarianFormEdit
                      form={form}
                      errors={errors}
                      libraryOptions={libraryOptions}
                      handleChange={handleChange}
                      handleLibraryChange={handleLibraryChange}
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

export default EditLibrarian;
