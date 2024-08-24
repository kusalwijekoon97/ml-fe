import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CContainer, CRow, CCol, CSpinner } from '@coreui/react';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';
import { Link, useNavigate } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import MaterialForm from '../../../components/forms/MaterialForm';

const CreateMaterial = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    author: null,
    translator: null,
    isbn: '',
    coverImage: null,
    publisher: '',
    publishDate: '',
    category: [],
    subCategory: [],
    library: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });

  const [errors, setErrors] = useState({
    name: '',
    author: null,
    translator: null,
    isbn: '',
    coverImage: null,
    publisher: '',
    publishDate: '',
    category: [],
    subCategory: [],
    library: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const [authorOptions, setAuthorOptions] = useState([])

  useEffect(() => {
    // Fetch libraries from API
    axios.get(`${base_url}/api/authors/all-open`)
      .then(response => {
        const authors = response.data.data.map(author => ({
          value: author._id,
          label: author.firstname + ' ' + author.lastname
        }));
        setAuthorOptions(authors);
      })
      .catch(error => {
        console.error("There was an error fetching the authors!", error);
      });
  }, []);

  const handleAuthorChange = (selectedAuthorOptions) => {
    setForm({ ...form, author: selectedAuthorOptions });
    setErrors({ ...errors, author: '' });
  };
  const handleTranslatorChange = (selectedTranslatorOptions) => {
    setForm({ ...form, translator: selectedTranslatorOptions });
    setErrors({ ...errors, translator: '' });
  };

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

  const handleLibraryChange = (selectedLibraryOptions) => {
    setForm({ ...form, library: selectedLibraryOptions });
    setErrors({ ...errors, library: '' });
  };

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setsubCategoryOptions] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    axios.get(`${base_url}/api/categories/main/all-open`)
      .then(response => {
        const categories = response.data.data.map(category => ({
          value: category._id,
          label: category.name
        }));
        setCategoryOptions(categories);
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  const handleCategoryChange = (selectedCategoryOptions) => {
    const selectedCategoryId = selectedCategoryOptions ? selectedCategoryOptions.value : null;
    console.log('selectedCategoryId :' + selectedCategoryId);
    setForm({ ...form, category: selectedCategoryOptions });
    setErrors({ ...errors, category: '' });

    if (selectedCategoryId) {
      axios.get(`${base_url}/api/sub/all-open/${selectedCategoryId}`)
        .then(response => {
          const subCategories = response.data.data.map(subCategory => ({
            value: subCategory._id,
            label: subCategory.name
          }));
          setsubCategoryOptions(subCategories);
        })
        .catch(error => {
          console.error("There was an error fetching the subcategories!", error);
          setsubCategoryOptions([]); // Clear subcategories in case of error
        });
    } else {
      setsubCategoryOptions([]);
    }
  };

  const handleSubCategoryChange = (selectedSubCategoryOptions) => {
    setForm({ ...form, subCategory: selectedSubCategoryOptions });
    setErrors({ ...errors, subCategory: '' });
  };


  const validateForm = () => {
    const newErrors = {};

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const formData = new FormData();

    axios.post(`${base_url}/api/materials/store`, formData, {
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

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
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
                    subtitle="create"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Materials"
                    linkTo="/materials"
                  />
                  <CCardBody>
                    <MaterialForm
                      form={form}
                      errors={errors}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      handlePrevious={handlePrevious}
                      handleNextStep={handleNextStep}
                      handlePreviousStep={handlePreviousStep}
                      currentStep={currentStep}
                      authorOptions={authorOptions}
                      handleAuthorChange={handleAuthorChange}
                      handleTranslatorChange={handleTranslatorChange}
                      libraryOptions={libraryOptions}
                      handleLibraryChange={handleLibraryChange}
                      categoryOptions={categoryOptions}
                      handleCategoryChange={handleCategoryChange}
                      subCategoryOptions={subCategoryOptions}
                      handleSubCategoryChange={handleSubCategoryChange}
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
