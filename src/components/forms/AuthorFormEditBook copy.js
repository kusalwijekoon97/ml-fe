import React, { useState, useEffect } from 'react';
import { CForm, CFormLabel, CButton, CFormFeedback, CFormInput, CFormTextarea, CRow, CCol, CSpinner } from '@coreui/react';
import Select from 'react-select';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Link } from 'react-router-dom';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AuthorFormEditBook = ({
  form,
  errors,
  addedBooks,
  handleAddedBookAddition,
  handleAddedBookRemoval,
  handleAddedBookChange,
  handleSubmit,
  handlePrevious,
  loading
}) => {

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol xs={12}>
            <div className="my-1">
              {addedBooks.map((addedBook, index) => (
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

                      <CCol xs={12}>
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

export default AuthorFormEditBook;
