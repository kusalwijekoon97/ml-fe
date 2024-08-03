// src\components\forms\CategoryForm.js

import React from 'react';
import {
  CForm,
  CFormLabel,
  CButton,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CRow,
  CCol
} from '@coreui/react';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import { cilDelete } from '@coreui/icons';
import { Link } from 'react-router-dom';

const CategoryForm = ({
  form,
  errors,
  libraryOptions,
  handleChange,
  handleLibraryChange,
  handleSubCategoryChange,
  addSubCategory,
  removeSubCategory,
  handleSubmit,
  handlePrevious,
  loading
}) => {
  return (
    <>
    <CForm onSubmit={handleSubmit}>
      <CRow>
        <CCol xs={6}>
          <div className="mb-3">
            <CFormLabel htmlFor="name">Category Name <span className='text-danger'>*</span></CFormLabel>
            <CFormInput
              type="text"
              id="name"
              name="name"
              placeholder="Enter category name"
              value={form.name}
              onChange={handleChange}
              invalid={!!errors.name}
            />
            <CFormFeedback>{errors.name}</CFormFeedback>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="library">Library <span className='text-danger'>*</span></CFormLabel>
            <Select
              id="library"
              name="library"
              options={libraryOptions}
              isMulti
              value={form.library}
              onChange={handleLibraryChange}
              className={errors.library ? 'is-invalid' : ''} />
            {errors.library && <CFormFeedback>{errors.library}</CFormFeedback>}
          </div>
        </CCol>
        <CCol xs={6}>
          <CRow>
            <CCol xs={12}>
              <div className="d-flex justify-content-between">
                <CFormLabel>Sub Categories</CFormLabel>
                <CButton
                  type="button"
                  size="sm"
                  color="info"
                  onClick={addSubCategory}
                >
                  Add Sub Category
                </CButton>
              </div>
            </CCol>
          </CRow>

          <CRow className='mt-1'>
            {form.subCategories.map((subCategory, index) => (
              <CCol xs={12} key={subCategory.id}>
                <CInputGroup className="mt-2">
                  <CFormInput
                    placeholder="Sub category name"
                    value={subCategory.name}
                    onChange={(e) => handleSubCategoryChange(index, e)}
                    invalid={errors.subCategories && !!errors.subCategories[index]}
                  />
                  <CButton
                    type="button"
                    color="danger"
                    variant="outline"
                    onClick={() => removeSubCategory(subCategory.id)}
                  >
                    <CIcon icon={cilDelete} />
                  </CButton>
                </CInputGroup>
                {errors.subCategories && errors.subCategories[index] && (
                  <CFormFeedback>{errors.subCategories[index]}</CFormFeedback>
                )}
              </CCol>
            ))}
          </CRow>
        </CCol>
      </CRow>

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

export default CategoryForm;
