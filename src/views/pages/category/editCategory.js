import React, { useState, useEffect } from 'react';
import {CCard,CCardBody,CContainer,CRow,CCol} from '@coreui/react';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import CategoryFormEdit from '../../../components/forms/CategoryFormEdit';

const EditCategory = () => {
  const navigate = useNavigate();
  const { catid } = useParams();

  const [form, setForm] = useState({
    name: '',
    main_slug: '',
    library: [],
    subCategories: []
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });
  const [errors, setErrors] = useState({
    name: '',
    main_slug: '',
    library: '',
    subCategories: []
  });
  const [libraryOptions, setLibraryOptions] = useState([]);

  // Fetch category data and libraries when component mounts
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const [categoryResponse, librariesResponse] = await Promise.all([
          axios.get(`${base_url}/api/categories/main/${catid}`),
          axios.get(`${base_url}/api/libraries/all-open`)
        ]);

        const libraries = librariesResponse.data.data.map(lib => ({
          value: lib._id,
          label: lib.name
        }));

        setLibraryOptions(libraries);

        const categoryData = categoryResponse.data.data;
        setForm({
          name: categoryData.name,
          main_slug: categoryData.main_slug,
          library: categoryData.library.map(lib => ({
            value: lib._id,
            label: lib.name
          })),
          subCategories: categoryData.subCategories.map(subCat => ({
            id: subCat._id,
            name: subCat.name,
            sub_slug: subCat.sub_slug
          }))
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Failed to load category data. Please try again.'
        });
        console.error(error);
      }
    };

    fetchCategoryData();
  }, [catid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleLibraryChange = (selectedOptions) => {
    setForm({ ...form, library: selectedOptions });
    setErrors({ ...errors, library: '' });
  };

  const handleSubCategoryChange = (index, event) => {
    const { name, value } = event.target;
    const newSubCategories = form.subCategories.map((subCategory, subIndex) => {
      if (index === subIndex) {
        return { ...subCategory, [name]: value };
      }
      return subCategory;
    });
    setForm({ ...form, subCategories: newSubCategories });
  };

  const addSubCategory = () => {
    setForm({
      ...form,
      subCategories: [...form.subCategories, { id: Date.now(), name: '', sub_slug: '' }]
    });
  };

  const removeSubCategory = (id) => {
    setForm({
      ...form,
      subCategories: form.subCategories.filter(subCategory => subCategory.id !== id)
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name) {
      newErrors.name = 'Category name is mandatory.';
    }

    if (!form.main_slug) {
      newErrors.main_slug = 'Category slug is mandatory.';
    }

    if (form.library.length === 0) {
      newErrors.library = 'Library is mandatory.';
    }

    form.subCategories.forEach((subCategory, index) => {
      if (!subCategory.name) {
        newErrors.subCategories = newErrors.subCategories || [];
        newErrors.subCategories[index] = 'Sub category name is mandatory.';
      }
      if (!subCategory.sub_slug) {
        newErrors.subCategories = newErrors.subCategories || [];
        newErrors.subCategories[index] = 'Sub category slug is mandatory.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && (!newErrors.subCategories || newErrors.subCategories.length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    const formattedForm = {
      ...form,
      library: form.library.map(option => option.value),
      subCategories: form.subCategories.map(subCategory => ({
        _id: subCategory.id, // Include ID if it's an existing subcategory
        name: subCategory.name,
        sub_slug: subCategory.sub_slug
      }))
    };

    axios.post(`${base_url}/api/categories/main/update/${catid}`, formattedForm)
      .then(response => {
        setLoading(false);
        navigate("/categories", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Category updated successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Category update failed. Please try again.'
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
                    subtitle="edit"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Categories"
                    linkTo="/categories"
                  />
                  <CCardBody>
                    <CategoryFormEdit
                      form={form}
                      errors={errors}
                      libraryOptions={libraryOptions}
                      handleChange={handleChange}
                      handleLibraryChange={handleLibraryChange}
                      handleSubCategoryChange={handleSubCategoryChange}
                      addSubCategory={addSubCategory}
                      removeSubCategory={removeSubCategory}
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

export default EditCategory;
