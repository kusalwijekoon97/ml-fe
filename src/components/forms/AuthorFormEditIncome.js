import React, { useState, useEffect } from 'react';
import { CForm, CFormLabel, CButton, CFormFeedback, CFormInput, CFormTextarea, CRow, CCol, CSpinner} from '@coreui/react';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import { Link } from 'react-router-dom';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AuthorFormEditIncome = ({
  form,
  errors,
  diedOptions,
  handleChange,
  handleDiedChange,
  handleFileChange,
  handleSubmit,
  handlePrevious,
  loading
}) => {
  const [imagePreview, setImagePreview] = useState(form.profileImage || '');

  useEffect(() => {
    if (form.profileImage) {
      setImagePreview(form.profileImage);
    }
  }, [form.profileImage]);

  const uploadProps = {
    beforeUpload: (file) => {
      setImagePreview(URL.createObjectURL(file));
      handleFileChange(file);
      return false;
    },
    fileList: form.profileImage ? [{ url: form.profileImage }] : [],
    accept: 'image/*',
  };

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol xs={6}>
            <div className="mb-3">
              <CFormLabel htmlFor="firstname">First Name <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Enter first name"
                value={form.firstname}
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
                value={form.lastname}
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
                value={form.penName}
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
                value={form.nationality}
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
                value={form.firstPublishDate}
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
                value={form.position}
                onChange={handleChange}
                invalid={!!errors.position}
              />
              <CFormFeedback>{errors.position}</CFormFeedback>
            </div>
          </CCol>

          <CCol xs={6}>
            <div className="mb-3">
              <CFormLabel htmlFor="income">Income <span className='text-danger'>*</span></CFormLabel>
              <CFormInput
                type="number"
                id="income"
                name="income"
                placeholder="Enter income"
                value={form.income}
                onChange={handleChange}
                invalid={!!errors.income}
              />
              <CFormFeedback>{errors.income}</CFormFeedback>
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
                className={errors.died ? 'is-invalid' : ''}
              />
              {errors.died && <CFormFeedback>{errors.died}</CFormFeedback>}
            </div>
          </CCol>

          <CCol xs={12}>
            <div className="mb-3">
              <CFormLabel htmlFor="description">Description <span className='text-danger'>*</span></CFormLabel>
              <CFormTextarea
                id="description"
                name="description"
                placeholder="Enter description"
                value={form.description}
                onChange={handleChange}
                invalid={!!errors.description}
                rows={3}
              />
              <CFormFeedback>{errors.description}</CFormFeedback>
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

export default AuthorFormEditIncome;
