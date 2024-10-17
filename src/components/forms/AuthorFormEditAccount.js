import React, { useState, useEffect } from 'react';
import { CForm, CFormLabel, CButton, CFormFeedback, CFormInput, CFormTextarea, CRow, CCol, CSpinner } from '@coreui/react';
import Select from 'react-select';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Link } from 'react-router-dom';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AuthorFormEditAccount = ({
  form,
  errors,
  accounts,
  handleAccountAddition,
  handleAccountRemoval,
  handleAccountChange,
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
              {accounts.map((account, index) => (
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
                    {/* <CCol xs={6}>
                        <div className="mb-3">
                          <CFormLabel htmlFor="name">Account Name <span className='text-danger'>*</span></CFormLabel> */}
                          <CFormInput
                            type="hidden"
                            id="name"
                            name="name"
                            placeholder="Enter account name"
                            value={account._id || ''}
                          />
                          {/* <CFormFeedback>{errors.name}</CFormFeedback>
                        </div>
                      </CCol> */}

                      <CCol xs={6}>
                        <div className="mb-3">
                          <CFormLabel htmlFor="name">Account Name <span className='text-danger'>*</span></CFormLabel>
                          <CFormInput
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter account name"
                            value={account.name || ''}
                            onChange={(e) => handleAccountChange(index, 'name', e.target.value)}
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
                            onChange={(e) => handleAccountChange(index, 'bank', e.target.value)}
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
                            onChange={(e) => handleAccountChange(index, 'branch', e.target.value)}
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
                            onChange={(e) => handleAccountChange(index, 'accountNumber', e.target.value)}
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
                            onChange={(e) => handleAccountChange(index, 'accountType', e.target.value)}
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
                            onChange={(e) => handleAccountChange(index, 'currency', e.target.value)}
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
                            onChange={(e) => handleAccountChange(index, 'swiftCode', e.target.value)}
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
                            onChange={(e) => handleAccountChange(index, 'iban', e.target.value)}
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

export default AuthorFormEditAccount;
