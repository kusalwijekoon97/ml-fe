import React from 'react';
import { CForm, CFormLabel, CButton, CFormFeedback, CFormInput, CRow, CCol, CSpinner, CFormCheck } from '@coreui/react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const Edit = ({
  form,
  errors,
  libraryOptions,
  handleChange,
  handleLibraryChange,
  handlePermissionChange,
  handleSubmit,
  handlePrevious,
  loading
}) => {
  const permissionKeys = Object.keys(form.permissions);
  const midIndex = Math.ceil(permissionKeys.length / 2);
  const firstColumnPermissions = permissionKeys.slice(0, midIndex);
  const secondColumnPermissions = permissionKeys.slice(midIndex);

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol xs={6}>
            <div className="mb-3">
              <CFormLabel htmlFor="firstName">First Name <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                value={form.firstName}
                onChange={handleChange}
                invalid={!!errors.firstName}
              />
              <CFormFeedback>{errors.firstName}</CFormFeedback>
            </div>
          </CCol>
          <CCol xs={6}>
            <div className="mb-3">
              <CFormLabel htmlFor="lastName">Last Name <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                value={form.lastName}
                onChange={handleChange}
                invalid={!!errors.lastName}
              />
              <CFormFeedback>{errors.lastName}</CFormFeedback>
            </div>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={6}>
            <div className="mb-3">
              <CFormLabel htmlFor="nic">NIC <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="text"
                id="nic"
                name="nic"
                placeholder="Enter NIC"
                value={form.nic}
                onChange={handleChange}
                invalid={!!errors.nic}
              />
              <CFormFeedback>{errors.nic}</CFormFeedback>
            </div>
          </CCol>
          <CCol xs={6}>
            <div className="mb-3">
              <CFormLabel htmlFor="email">Email <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                invalid={!!errors.email}
              />
              <CFormFeedback>{errors.email}</CFormFeedback>
            </div>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={6}>
            <div className="mb-3">
              <CFormLabel htmlFor="phone">Phone <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
                invalid={!!errors.phone}
              />
              <CFormFeedback>{errors.phone}</CFormFeedback>
            </div>
          </CCol>

          <CCol xs={6}>
            <div className="mb-3">
              <CFormLabel htmlFor="address">Address <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="text"
                id="address"
                name="address"
                placeholder="Enter address"
                value={form.address}
                onChange={handleChange}
                invalid={!!errors.address}
              />
              <CFormFeedback>{errors.address}</CFormFeedback>
            </div>
          </CCol>

          <CCol xs={6}>
            <div className="mb-3">
              <CFormLabel htmlFor="library">Library <span className='text-danger'>*</span></CFormLabel>
              <Select
                id="library"
                name="library"
                options={libraryOptions}
                isMulti
                value={form.libraries}
                onChange={handleLibraryChange}
                className={errors.libraries ? 'is-invalid' : ''}
              />
              {errors.libraries && <CFormFeedback>{errors.libraries}</CFormFeedback>}
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <CFormLabel htmlFor="library">Choose Access Levels for Menus</CFormLabel>
          </CCol>
          <CCol xs={6}>
            {firstColumnPermissions.map(permission => (
              <div key={permission} className="form-check">
                <CFormCheck
                  key={permission}
                  type="checkbox"
                  id={permission}
                  name={permission}
                  checked={form.permissions[permission]}
                  onChange={handlePermissionChange}
                />
                <CFormLabel htmlFor={permission} className="form-check-label ms-2">
                  {permission}
                </CFormLabel>
              </div>
            ))}
          </CCol>
          <CCol xs={6}>
            {secondColumnPermissions.map(permission => (
              <div key={permission} className="form-check">
                <CFormCheck
                  key={permission}
                  type="checkbox"
                  id={permission}
                  name={permission}
                  checked={form.permissions[permission]}
                  onChange={handlePermissionChange}
                />
                <CFormLabel htmlFor={permission} className="form-check-label ms-2">
                  {permission}
                </CFormLabel>
              </div>
            ))}
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

export default Edit;
