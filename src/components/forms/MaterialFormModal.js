import React, { useState } from 'react';
import { CForm, CFormLabel, CButton, CFormFeedback, CFormInput, CRow, CCol, CSpinner } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import axios from 'axios';

const MaterialFormModal = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    fileMaterial: null
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });

  const [errors, setErrors] = useState({
    name: '',
    fileMaterial: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleMaterialChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = 'Name is mandatory.';
    if (!form.fileMaterial) newErrors.fileMaterial = 'File is mandatory.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('fileMaterial', form.fileMaterial);

    axios.post(`${base_url}/api/materials/store`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        setLoading(false);
        navigate("/materials", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Material created successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Material creation failed. Please try again.'
        });
        console.error(error);
      });
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol xs={12}>
            <div className="mb-3">
              <CFormLabel htmlFor="name">Name <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
                invalid={!!errors.name}
              />
              <CFormFeedback>{errors.name}</CFormFeedback>
            </div>
          </CCol>
          <CCol xs={12}>
            <div className="mb-3">
              <CFormLabel htmlFor="fileMaterial">File <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="file"
                id="fileMaterial"
                name="fileMaterial"
                className="me-2"
                onChange={handleMaterialChange}
              />
              <CFormFeedback>{errors.fileMaterial}</CFormFeedback>
            </div>
          </CCol>
        </CRow>

        <div className="text-end">
          <CButton type="button"
            size='sm'
            color="danger"
            className="me-2"
            onClick={() => navigate('/dashboard')}
            disabled={loading}>Cancel</CButton>
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
            disabled={loading}>
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
    </>
  );
};

export default MaterialFormModal;
