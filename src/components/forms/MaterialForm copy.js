import React from 'react';
import { CForm, CFormLabel, CButton, CFormFeedback, CFormInput, CFormSelect, CFormTextarea, CInputGroup, CRow, CCol, CSpinner } from '@coreui/react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const MaterialForm = ({
  form,
  errors,
  handleChange,
  handleSubmit,
  handlePrevious,
  handleNextStep,
  handlePreviousStep,
  currentStep,
  loading
}) => {
  return (
    <>
      <CForm onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div id='stepOne'>
            <CRow>
              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="name">Material Name <span className='text-danger'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter material name"
                    value={form.name}
                    onChange={handleChange}
                    invalid={!!errors.name}
                  />
                  <CFormFeedback>{errors.name}</CFormFeedback>
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="authorId">Author ID <span className='text-danger'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="authorId"
                    name="authorId"
                    placeholder="Enter author ID"
                    value={form.authorId}
                    onChange={handleChange}
                    invalid={!!errors.authorId}
                  />
                  <CFormFeedback>{errors.authorId}</CFormFeedback>
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="translatorId">Translator ID</CFormLabel>
                  <CFormInput
                    type="text"
                    id="translatorId"
                    name="translatorId"
                    placeholder="Enter translator ID"
                    value={form.translatorId}
                    onChange={handleChange}
                    invalid={!!errors.translatorId}
                  />
                  <CFormFeedback>{errors.translatorId}</CFormFeedback>
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="isbn">ISBN</CFormLabel>
                  <CFormInput
                    type="text"
                    id="isbn"
                    name="isbn"
                    placeholder="Enter ISBN"
                    value={form.isbn}
                    onChange={handleChange}
                    invalid={!!errors.isbn}
                  />
                  <CFormFeedback>{errors.isbn}</CFormFeedback>
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="coverImage">Cover Image URL</CFormLabel>
                  <CFormInput
                    type="text"
                    id="coverImage"
                    name="coverImage"
                    placeholder="Enter cover image URL"
                    value={form.coverImage}
                    onChange={handleChange}
                    invalid={!!errors.coverImage}
                  />
                  <CFormFeedback>{errors.coverImage}</CFormFeedback>
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="publisher">Publisher</CFormLabel>
                  <CFormInput
                    type="text"
                    id="publisher"
                    name="publisher"
                    placeholder="Enter publisher name"
                    value={form.publisher}
                    onChange={handleChange}
                    invalid={!!errors.publisher}
                  />
                  <CFormFeedback>{errors.publisher}</CFormFeedback>
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="publishDate">Publish Date</CFormLabel>
                  <CFormInput
                    type="text"
                    id="publishDate"
                    name="publishDate"
                    placeholder="Enter publish date"
                    value={form.publishDate}
                    onChange={handleChange}
                    invalid={!!errors.publishDate}
                  />
                  <CFormFeedback>{errors.publishDate}</CFormFeedback>
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="language">Language</CFormLabel>
                  <CFormInput
                    type="text"
                    id="language"
                    name="language"
                    placeholder="Enter language"
                    value={form.language}
                    onChange={handleChange}
                    invalid={!!errors.language}
                  />
                  <CFormFeedback>{errors.language}</CFormFeedback>
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs={12}>
                <div className="mb-3">
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormTextarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                    invalid={!!errors.description}
                  />
                  <CFormFeedback>{errors.description}</CFormFeedback>
                </div>
              </CCol>
            </CRow>

          </div>
        )}

        {currentStep === 2 && (
          <div id='stepTwo'>
            <CRow>
              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="lastname">Last Name <span className='text-danger'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Enter last name"
                    value={form.lastname}
                    onChange={handleChange}
                    invalid={!!errors.lastname}
                  />
                  <CFormFeedback>{errors.lastname}</CFormFeedback>
                </div>
              </CCol>
            </CRow>
          </div>
        )}

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
            onClick={handlePreviousStep}
            disabled={loading || currentStep === 1}>Previous</CButton>
          {currentStep < 2 && (
            <CButton type="button"
              size='sm'
              color="primary"
              className="me-2"
              onClick={handleNextStep} disabled={loading}>Next</CButton>
          )}
          {currentStep === 2 && (
            <CButton type="submit"
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
          )}
        </div>

      </CForm>
    </>
  );
};

export default MaterialForm;
