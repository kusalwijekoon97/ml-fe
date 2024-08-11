import React from 'react';
import { CForm, CFormLabel, CButton, CFormFeedback, CFormInput, CRow, CCol, CSpinner } from '@coreui/react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const LibraryFormEdit = ({
  form,
  errors,
  handleChange,
  handleSelectChange,
  handleSubmit,
  handlePrevious,
  loading,
  librarians, // Receive librarians prop
}) => {
  // Convert librarians to the format expected by react-select
  const librarianOptions = librarians.map(lib => ({
    value: lib._id,
    label: `${lib.firstName} ${lib.lastName}`,
  }));

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

          <CCol xs={12}>
            <div className="mb-3">
              <CFormLabel htmlFor="librarian">Librarian <span className='text-danger'>*</span></CFormLabel>
              <Select
                id="librarian"
                name="librarian"
                placeholder="Select a librarian"
                value={form.librarian}
                onChange={handleSelectChange}
                options={librarianOptions}
                isClearable
                isDisabled={loading}
              />
              <CFormFeedback>{errors.librarian}</CFormFeedback>
            </div>
          </CCol>
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

export default LibraryFormEdit;
