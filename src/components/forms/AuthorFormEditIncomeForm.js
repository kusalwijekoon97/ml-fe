import React, { useState, useEffect } from 'react';
import { CForm, CFormLabel, CButton, CFormFeedback, CFormInput, CFormTextarea, CRow, CCol, CSpinner } from '@coreui/react';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import { Link } from 'react-router-dom';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AuthorFormEditIncomeForm = ({
  formIncome,
  errors,
  incomeStatusOptions,
  authorAccountOptions,
  handleChange,
  handleIncomeStatusChange,
  handleIncomeAccountChange,
  handleInvoiceFileChange,
  handleSubmit,
  handlePrevious,
  loading
}) => {
  const [imagePreview, setImagePreview] = useState(formIncome.profileImage || '');

  useEffect(() => {
    if (formIncome.profileImage) {
      setImagePreview(formIncome.profileImage);
    }
  }, [formIncome.profileImage]);

  const uploadProps = {
    beforeUpload: (file) => {
      setImagePreview(URL.createObjectURL(file));
      handleInvoiceFileChange(file);
      return false;
    },
    fileList: formIncome.profileImage ? [{ url: formIncome.profileImage }] : [],
    accept: 'image/*',
  };

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CRow className="mb-3">
          <CCol xs={3}>
            <div className="mb-3">
              <CFormLabel htmlFor="paymentAmount">
                Payment Amount <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                type="number"
                id="paymentAmount"
                name="paymentAmount"
                placeholder="Enter payment amount"
                value={formIncome.paymentAmount || ''}
                onChange={handleChange}
                invalid={!!errors.paymentAmount}
              />
              <CFormFeedback>{errors.paymentAmount}</CFormFeedback>
            </div>
          </CCol>
          <CCol xs={3}>
            <div className="mb-3">
              <CFormLabel htmlFor="paymentDate">
                Payment Date <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                type="date"
                id="paymentDate"
                name="paymentDate"
                value={formIncome.paymentDate || ''}
                onChange={handleChange}
                invalid={!!errors.paymentDate}
              />
              <CFormFeedback>{errors.paymentDate}</CFormFeedback>
            </div>
          </CCol>

          <CCol xs={3}>
            <div className="mb-3">
              <CFormLabel htmlFor="paymentAccountId">
                Payment Account <span className="text-danger">*</span>
              </CFormLabel>
              <Select
                id="paymentStatus"
                name="paymentAccountId"
                options={authorAccountOptions}
                value={authorAccountOptions.find(option => option.value === formIncome.paymentAccountId)}
                onChange={handleIncomeAccountChange}
                className={errors.paymentAccountId ? 'is-invalid' : ''}
              />
              <CFormFeedback>{errors.paymentAccountId}</CFormFeedback>
            </div>
          </CCol>
          <CCol xs={3}>
            <div className="mb-3">
              <CFormLabel htmlFor="paymentStatus">
                Payment Status <span className="text-danger">*</span>
              </CFormLabel>
              <Select
                id="paymentStatus"
                name="paymentStatus"
                options={incomeStatusOptions}
                value={incomeStatusOptions.find(option => option.value === formIncome.paymentStatus)}
                onChange={handleIncomeStatusChange}
                className={errors.paymentStatus ? 'is-invalid' : ''}
              />
              <CFormFeedback>{errors.paymentStatus}</CFormFeedback>
            </div>
          </CCol>

          <CCol xs={3}>
            <div className="mb-3">
              <CFormLabel htmlFor="invoice">Invoice</CFormLabel>
              <CFormInput
                type="file"
                id="invoice"
                name="invoice"
              // onChange={handleFileUpload}
              />
            </div>
          </CCol>
          <CCol xs={9}>
            <div className="mb-3">
              <CFormLabel htmlFor="paymentDescription">Payment Description</CFormLabel>
              <CFormInput
                type="text"
                id="paymentDescription"
                name="paymentDescription"
                placeholder="Enter payment description"
                value={formIncome.paymentDescription || ''}
                onChange={handleChange}
              />
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
                <CSpinner as="span" size="sm" aria-hidden="true" /> Saving...
              </>
            ) : (
              'Save'
            )}
          </CButton>
        </div>
      </CForm>
    </>
  );
};

export default AuthorFormEditIncomeForm;
