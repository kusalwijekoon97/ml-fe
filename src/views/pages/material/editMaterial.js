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
import MaterialFormEdit from '../../../components/forms/MaterialFormEdit';

const EditMaterial = () => {
  const navigate = useNavigate();
  const { materialId } = useParams();

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

  useEffect(() => {
    const fetchMaterialData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/api/materials/${materialId}`);
        const data = response.data.data;
        setForm({
          name: data.name,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Failed to load material data. Please try again.'
        });
        console.error(error);
      }
    };

    fetchMaterialData();
  }, [materialId]);

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

    axios.post(`${base_url}/api/materials/update/${materialId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setLoading(false);
        navigate("/materials", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Material updated successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Material update failed. Please try again.'
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
        <AppHeader title="Materials" />
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
                    title="Material"
                    subtitle="edit"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Materials"
                    linkTo="/materials"
                  />
                  <CCardBody>
                    <MaterialFormEdit
                      form={form}
                      errors={errors}
                      handleChange={handleChange}
                      handleMaterialChange={handleMaterialChange}
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

export default EditMaterial;
