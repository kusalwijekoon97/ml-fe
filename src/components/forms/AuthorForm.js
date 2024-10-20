import React, { useState } from 'react';
import { CForm, CFormLabel, CButton, CFormFeedback, CFormInput, CFormSelect, CFormTextarea, CRow, CCol, CSpinner, CCardText } from '@coreui/react';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilMinus, cilPlus, cilTrash, cilList, cilFile } from '@coreui/icons';
import Select from 'react-select';
import { Upload, Button, message } from 'antd';
import { UserOutlined, UploadOutlined, BookOutlined, AccountBookOutlined } from '@ant-design/icons';

const AuthorForm = ({
  form,
  errors,
  diedOptions,
  handleDiedChange,
  handleChange,
  handleFileChange,
  handleSubmit,
  handlePrevious,
  loading,
  handleNextStep,
  handlePreviousStep,
  currentStep,
  addedBooks,
  handleAddedBookAddition,
  handleAddedBookRemoval,
  handleAddedBookChange,
  accounts,
  handleAccountAddition,
  handleAccountRemoval,
  handleAccountChange,
  libraryOptions,
  handleLibraryChange,
}) => {
  const [imagePreview, setImagePreview] = useState(form.profileImage ? URL.createObjectURL(form.profileImage) : '');

  const uploadProps = {
    beforeUpload: (file) => {
      setImagePreview(URL.createObjectURL(file));
      handleFileChange(file);
      return false;
    },
    fileList: form.profileImage ? [form.profileImage] : [],
    accept: 'image/*',
  };

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div id='stepOne'>
            <CRow>
              <CCol xs={12} className="mb-3">
                <CCardText style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', position: 'relative', paddingBottom: '8px' }}>
                  <UserOutlined style={{ marginRight: '8px' }} /> General Information
                  <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#000' }}></span>
                </CCardText>
              </CCol>
              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="firstname">First Name <span className='text-danger'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Enter first name"
                    value={form.firstname || ''}
                    onChange={handleChange}
                    invalid={!!errors.firstname}
                  />
                  <CFormFeedback>{errors.firstname}</CFormFeedback>
                </div>
              </CCol>
              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="lastname">Last Name <span className='text-danger'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Enter last name"
                    value={form.lastname || ''}
                    onChange={handleChange}
                    invalid={!!errors.lastname}
                  />
                  <CFormFeedback>{errors.lastname}</CFormFeedback>
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="profileImage">Profile Image <span className='text-danger'>*</span></CFormLabel>
                  <div>
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
                    </Upload>
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Profile Preview"
                          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </div>
                    )}
                  </div>
                  {errors.profileImage && <CFormFeedback className="d-block">{errors.profileImage}</CFormFeedback>}
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="penName">Pen Name <span className='text-danger'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="penName"
                    name="penName"
                    placeholder="Enter pen name"
                    value={form.penName || ''}
                    onChange={handleChange}
                    invalid={!!errors.penName}
                  />
                  <CFormFeedback>{errors.penName}</CFormFeedback>
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="nationality">Nationality <span className='text-danger'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="nationality"
                    name="nationality"
                    placeholder="Enter nationality"
                    value={form.nationality || ''}
                    onChange={handleChange}
                    invalid={!!errors.nationality}
                  />
                  <CFormFeedback>{errors.nationality}</CFormFeedback>
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="firstPublishDate">First Publish Date <span className='text-danger'>*</span></CFormLabel>
                  <CFormInput
                    type="date"
                    id="firstPublishDate"
                    name="firstPublishDate"
                    value={form.firstPublishDate || ''}
                    onChange={handleChange}
                    invalid={!!errors.firstPublishDate}
                  />
                  <CFormFeedback>{errors.firstPublishDate}</CFormFeedback>
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="position">Position <span className='text-danger'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="position"
                    name="position"
                    placeholder="Enter position"
                    value={form.position || ''}
                    onChange={handleChange}
                    invalid={!!errors.position}
                  />
                  <CFormFeedback>{errors.position}</CFormFeedback>
                </div>
              </CCol>

              <CCol xs={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="died">Died <span className='text-danger'>*</span></CFormLabel>
                  <Select
                    id="died"
                    name="died"
                    options={diedOptions}
                    value={diedOptions.find(option => option.value === form.died)}
                    onChange={handleDiedChange}
                    isInvalid={!!errors.died}
                  />
                  <CFormFeedback>{errors.died}</CFormFeedback>
                </div>
              </CCol>

              <CCol xs={12}>
                <div className="mb-3">
                  <CFormLabel htmlFor="description">Description <span className='text-danger'>*</span></CFormLabel>
                  <CFormTextarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    value={form.description || ''}
                    onChange={handleChange}
                    invalid={!!errors.description}
                    rows={2}
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
              <CCol xs={12} className="mb-3">
                <CCardText style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', position: 'relative', paddingBottom: '8px' }}>
                  <BookOutlined style={{ marginRight: '8px' }} /> Book Information
                  <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#000' }}></span>
                </CCardText>
              </CCol>
              <CCol xs={12}>
                <div className="my-1">
                  {form.addedBooks.map((addedBook, index) => (
                    <React.Fragment key={index}>
                      <div style={{ border: '1px solid #5c5c5c', borderRadius: '8px', padding: '10px', position: 'relative', marginBottom: '8px' }}>
                        <div className="d-flex justify-content-end">
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => handleAddedBookRemoval(index)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </div>
                        <CRow>
                          <CCol xs={12}>
                            <div className="mb-3">
                              <CFormLabel htmlFor="added_book_isbn">Book ISBN <span className='text-danger'>*</span></CFormLabel>
                              <CFormInput
                                type="text"
                                id="added_book_isbn"
                                name="added_book_isbn"
                                placeholder="Enter book isbn"
                                value={addedBook.added_book_isbn || ''}
                                onChange={(e) => handleAddedBookChange(index, e)}
                              />
                              <CFormFeedback>{errors.added_book_isbn}</CFormFeedback>
                            </div>
                          </CCol>

                          <CCol xs={3}>
                            <div className="mb-3">
                              <CFormLabel htmlFor="library">Library <span className='text-danger'>*</span></CFormLabel>
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

                          <CCol xs={9}>
                            <div className="mb-3">
                              <CFormLabel htmlFor="added_book_name">Book Name <span className='text-danger'>*</span></CFormLabel>
                              <CFormInput
                                type="text"
                                id="added_book_name"
                                name="added_book_name"
                                placeholder="Enter book name"
                                value={addedBook.added_book_name || ''}
                                onChange={(e) => handleAddedBookChange(index, e)}
                              />
                              <CFormFeedback>{errors.added_book_name}</CFormFeedback>
                            </div>
                          </CCol>
                        </CRow>
                      </div>
                    </React.Fragment>
                  ))}

                  <div className='d-flex justify-content-start'>
                    <CButton color="primary" onClick={handleAddedBookAddition}>+ Add Book</CButton>
                  </div>

                </div>
              </CCol>
            </CRow>
          </div>
        )}

        {currentStep === 3 && (
          <div id='stepThree'>
            <CRow>
              <CCol xs={12} className="mb-3">
                <CCardText style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', position: 'relative', paddingBottom: '8px' }}>
                  <AccountBookOutlined style={{ marginRight: '8px' }} /> Account Information
                  <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#000' }}></span>
                </CCardText>
              </CCol>
              <CCol xs={12}>
                <div className="my-1">
                  {form.accounts.map((account, index) => (
                    <React.Fragment key={index}>
                      <div style={{ border: '1px solid #5c5c5c', borderRadius: '8px', padding: '10px', position: 'relative', marginBottom: '8px' }}>
                        <div className="d-flex justify-content-end">
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => handleAccountRemoval(index)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </div>
                        <CRow>
                          <CCol xs={6}>
                            <div className="mb-3">
                              <CFormLabel htmlFor="name">Account Name <span className='text-danger'>*</span></CFormLabel>
                              <CFormInput
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter account name"
                                value={account.name || ''}
                                onChange={(e) => handleAccountChange(index, e)}
                              />
                              <CFormFeedback>{errors.name}</CFormFeedback>
                            </div>
                          </CCol>

                          <CCol xs={6}>
                            <div className="mb-3">
                              <CFormLabel htmlFor="bank">Bank <span className='text-danger'>*</span></CFormLabel>
                              <CFormInput
                                type="text"
                                id="bank"
                                name="bank"
                                placeholder="Enter bank"
                                value={account.bank || ''}
                                onChange={(e) => handleAccountChange(index, e)}
                              />
                              <CFormFeedback>{errors.bank}</CFormFeedback>
                            </div>
                          </CCol>

                          <CCol xs={6}>
                            <div className="mb-3">
                              <CFormLabel htmlFor="branch">Branch <span className='text-danger'>*</span></CFormLabel>
                              <CFormInput
                                type="text"
                                id="branch"
                                name="branch"
                                placeholder="Enter branch"
                                value={account.branch || ''}
                                onChange={(e) => handleAccountChange(index, e)}
                              />
                              <CFormFeedback>{errors.branch}</CFormFeedback>
                            </div>
                          </CCol>

                          <CCol xs={6}>
                            <div className="mb-3">
                              <CFormLabel htmlFor="accountNumber">Account Number <span className='text-danger'>*</span></CFormLabel>
                              <CFormInput
                                type="text"
                                id="accountNumber"
                                name="accountNumber"
                                placeholder="Enter account number"
                                value={account.accountNumber || ''}
                                onChange={(e) => handleAccountChange(index, e)}
                              />
                              <CFormFeedback>{errors.accountNumber}</CFormFeedback>
                            </div>
                          </CCol>

                          <CCol xs={6}>
                            <div className="mb-3">
                              <CFormLabel htmlFor="accountType">Account Type <span className='text-danger'>*</span></CFormLabel>
                              <CFormInput
                                type="text"
                                id="accountType"
                                name="accountType"
                                placeholder="Enter account type"
                                value={account.accountType || ''}
                                onChange={(e) => handleAccountChange(index, e)}
                              />
                              <CFormFeedback>{errors.accountType}</CFormFeedback>
                            </div>
                          </CCol>

                          <CCol xs={6}>
                            <div className="mb-3">
                              <CFormLabel htmlFor="currency">Currency <span className='text-danger'>*</span></CFormLabel>
                              <CFormInput
                                type="text"
                                id="currency"
                                name="currency"
                                placeholder="Enter currency"
                                value={account.currency || ''}
                                onChange={(e) => handleAccountChange(index, e)}
                              />
                              <CFormFeedback>{errors.currency}</CFormFeedback>
                            </div>
                          </CCol>

                          <CCol xs={6}>
                            <div className="mb-3">
                              <CFormLabel htmlFor="swiftCode">SWIFT Code (Optional)</CFormLabel>
                              <CFormInput
                                type="text"
                                id="swiftCode"
                                name="swiftCode"
                                placeholder="Enter SWIFT code"
                                value={account.swiftCode || ''}
                                onChange={(e) => handleAccountChange(index, e)}
                              />
                              <CFormFeedback>{errors.swiftCode}</CFormFeedback>
                            </div>
                          </CCol>

                          <CCol xs={6}>
                            <div className="mb-3">
                              <CFormLabel htmlFor="iban">IBAN (Optional)</CFormLabel>
                              <CFormInput
                                type="text"
                                id="iban"
                                name="iban"
                                placeholder="Enter IBAN"
                                value={account.iban || ''}
                                onChange={(e) => handleAccountChange(index, e)}
                              />
                              <CFormFeedback>{errors.iban}</CFormFeedback>
                            </div>
                          </CCol>

                        </CRow>
                      </div>
                    </React.Fragment>
                  ))}

                  <div className='d-flex justify-content-start'>
                    <CButton color="primary" onClick={handleAccountAddition}>+ Add Account</CButton>
                  </div>

                </div>
              </CCol>
            </CRow>
          </div>
        )}

        <div className="text-end">
          <Link to="/dashboard">
            <CButton
              type="button"
              size="sm"
              color="danger"
              className="me-2"
              disabled={loading}
            >
              Cancel
            </CButton>
          </Link>

          <CButton
            type="button"
            size="sm"
            color="secondary"
            className="me-2"
            onClick={handlePreviousStep}
            disabled={loading || currentStep === 1}
          >
            Previous
          </CButton>

          {currentStep < 3 && (
            <CButton
              type="button"
              size="sm"
              color="primary"
              className="me-2"
              onClick={handleNextStep}
              disabled={loading}
            >
              Next
            </CButton>
          )}

          {currentStep === 3 && (
            <CButton
              type="submit"
              size="sm"
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
          )}
        </div>

      </CForm>
    </>
  );
};

export default AuthorForm;
