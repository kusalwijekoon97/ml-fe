import React from 'react';
import { CForm, CFormLabel, CButton, CFormFeedback, CFormInput, CFormSelect, CFormTextarea, CInputGroup, CRow, CCol, CSpinner, CFormCheck } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMinus, cilPlus } from '@coreui/icons';
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
  authorOptions,
  handleAuthorChange,
  handleTranslatorChange,
  libraryOptions,
  handleLibraryChange,
  categoryOptions,
  handleCategoryChange,
  subCategoryOptions,
  handleSubCategoryChange,
  handleHasSeriesChange,
  seriesNumberIncrease,
  seriesNumberDecrease,
  seriesOptions,
  loading
}) => {
  return (
    <>
      <CForm onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div id='stepOne'>
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

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="authorId">Author <span className='text-danger'>*</span></CFormLabel>
                  <Select
                    id="authorId"
                    name="authorId"
                    options={authorOptions}
                    value={form.author}
                    onChange={handleAuthorChange}
                    className={errors.author ? 'is-invalid' : ''} />
                  {errors.author && <CFormFeedback>{errors.author}</CFormFeedback>}
                </div>
              </CCol>
              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="translatorId">Translator</CFormLabel>
                  <Select
                    id="translatorId"
                    name="translatorId"
                    options={authorOptions}
                    value={form.translator}
                    onChange={handleTranslatorChange}
                    className={errors.translator ? 'is-invalid' : ''} />
                  {errors.translator && <CFormFeedback>{errors.translator}</CFormFeedback>}
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
              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="coverImage">Cover Image</CFormLabel>
                  <CFormInput
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    onChange={handleChange}
                    invalid={!!errors.coverImage}
                    accept=".png, .jpg, .jpeg"
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

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="publishDate">Publish Date</CFormLabel>
                  <CFormInput
                    type="date"
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

              <CCol xs={12}>
                <div className="mb-3">
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormTextarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    rows="3"
                    value={form.description}
                    onChange={handleChange}
                    invalid={!!errors.description}
                  />
                  <CFormFeedback>{errors.description}</CFormFeedback>
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="language">Library</CFormLabel>
                  <Select
                    id="library"
                    name="library"
                    options={libraryOptions}
                    value={form.library}
                    onChange={handleLibraryChange}
                    className={errors.library ? 'is-invalid' : ''} />
                  {errors.library && <CFormFeedback>{errors.library}</CFormFeedback>}
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="category">Category</CFormLabel>
                  <Select
                    id="category"
                    name="category"
                    options={categoryOptions}
                    isMulti
                    value={form.category}
                    onChange={handleCategoryChange}
                    className={errors.category ? 'is-invalid' : ''}
                  />
                  {errors.category && <CFormFeedback>{errors.category}</CFormFeedback>}
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="subCategory">Sub Category</CFormLabel>
                  <Select
                    id="subCategory"
                    name="subCategory"
                    options={subCategoryOptions}
                    isMulti
                    value={form.subCategory}
                    onChange={handleSubCategoryChange}
                    className={errors.subCategory ? 'is-invalid' : ''}
                  />
                  {errors.subCategory && <CFormFeedback>{errors.subCategory}</CFormFeedback>}
                </div>
              </CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol xs={12}>
                <div className="mb-3">
                  <CFormLabel htmlFor="hasSeries">Series </CFormLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <CFormCheck inline
                    type="radio"
                    name="hasSeries"
                    id="hasSeriesFalse"
                    value="False"
                    label="No"
                    checked={!form.hasSeries}
                    onChange={handleHasSeriesChange}
                    invalid={!!errors.hasSeries} />
                  <CFormCheck inline
                    type="radio"
                    name="hasSeries"
                    id="hasSeriesTrue"
                    value="True"
                    label="Yes"
                    checked={form.hasSeries}
                    onChange={handleHasSeriesChange}
                    invalid={!!errors.hasSeries} />
                  {errors.hasSeries && <CFormFeedback>{errors.hasSeries}</CFormFeedback>}
                </div>
              </CCol>
              {form.hasSeries && (
                <div id="seriesInfo">
                  <CRow>
                    <CCol xs={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="name">Book number of the series</CFormLabel>
                        <CInputGroup className="mb-3">
                          <CButton color="outline-primary" onClick={seriesNumberDecrease} disabled={!form.hasSeries}>
                            <CIcon icon={cilMinus} />
                          </CButton>
                          <CFormInput
                            type="number"
                            id="noOfSeries"
                            name="noOfSeries"
                            placeholder="Enter series number"
                            value={form.noOfSeries}
                            onChange={handleChange}
                            readOnly
                            disabled={!form.hasSeries}
                          />
                          <CButton color="outline-primary" onClick={seriesNumberIncrease} disabled={!form.hasSeries}>
                            <CIcon icon={cilPlus} />
                          </CButton>
                        </CInputGroup>

                      </div>
                    </CCol>
                    <CCol xs={6} id="previousSeries">
                      <div className="mb-3">
                        <CFormLabel htmlFor="previousSeries">Series </CFormLabel>
                        <Select
                          id="previousSeries"
                          name="previousSeries"
                          options={seriesOptions} />
                      </div>
                    </CCol>
                  </CRow>
                </div>
              )}
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
