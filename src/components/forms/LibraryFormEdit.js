import React from 'react';
import {CForm,CFormLabel,CButton,CFormFeedback,CFormInput,CFormTextarea,CRow,CCol,CSpinner} from '@coreui/react';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import { Link } from 'react-router-dom';

const AuthorFormEdit = ({
  form,
  errors,
  handleChange,
  handleSubmit,
  handlePrevious,
  loading
}) => {
  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol xs={12}>
            <div className="mb-3">
              <CFormLabel htmlFor="name">Library Name <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="text"
                id="name"
                name="name"
                placeholder="Enter library name"
                value={form.name}
                onChange={handleChange}
                invalid={!!errors.name}
              />
              <CFormFeedback>{errors.name}</CFormFeedback>
            </div>
          </CCol>


          {/* <CCol xs={6}>
            <div className="mb-3">
              <CFormLabel htmlFor="position">Position <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="text"
                id="position"
                name="position"
                placeholder="Enter position"
                value={form.position}
                onChange={handleChange}
                invalid={!!errors.position}
              />
              <CFormFeedback>{errors.position}</CFormFeedback>
            </div>
          </CCol> */}
        </CRow>

        <div className="text-end">
          <Link to="/dashboard">
            <CButton
              type="button"
              size='sm'
              color="danger"
              className="me-2"
              disabled={loading}
            >
              Cancel
            </CButton>
          </Link>
          <CButton
            type="button"
            size='sm'
            color="secondary"
            className="me-2"
            onClick={handlePrevious}
            disabled={loading}
          >
            Previous
          </CButton>
          <CButton
            type="submit"
            size='sm'
            color="success"
            disabled={loading}
          >
            {loading ? (
              <>
                <CSpinner as="span" size="sm" aria-hidden="true" /> Updating...
              </>
            ) : (
              'Update'
            )}
          </CButton>
        </div>
      </CForm>
    </>
  );
};

export default AuthorFormEdit;
