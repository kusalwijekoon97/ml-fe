import React from 'react';
import { CForm, CFormLabel, CButton, CFormFeedback, CFormInput, CFormSelect, CFormTextarea, CInputGroup, CRow, CCol, CSpinner, CFormCheck, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CFormText } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMinus, cilPlus, cilDelete, cilFile } from '@coreui/icons';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import base_url from "../../utils/api/base_url";
import { Upload, Button, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const BookForm = ({
  form,
  errors,
  handleChange,
  handleSubmit,
  handlePrevious,
  handleNextStep,
  handlePreviousStep,
  currentStep,
  handleCoverImageChange,
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
  generateSeriesInputs,
  handleBookTypeChange,
  materialEAFormats,
  materialOptions,
  handleMaterialChange,
  handleCompleteMaterialChange,
  handleCompleteMaterialSourceChange,
  chapters,
  handleChapterAddition,
  handleChapterRemoval,
  handleChapterChange,
  handleChapterMaterialSourceChange,
  loading,
  MaterialFormModal,
  showModal,
  handleAddMaterialFileClick,
  handleMaterialFileUpload
}) => {
  const uploadMaterialFile = async (file, onSuccess, onError) => {
    const formData = new FormData();
    formData.append('fileMaterial', file);

    try {
      const response = await fetch(`${base_url}/api/materials/store`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data && data.data && data.data.material_path) {
        onSuccess(data.data.material_path);
        message.success('File uploaded successfully');
      } else {
        onError('Failed to upload file');
      }
    } catch (error) {
      onError('Upload failed');
      console.error(error);
    }
  };

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
                    onChange={handleCoverImageChange}
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
                  <CFormLabel htmlFor="hasSeries">Series  <span className='text-danger'>*</span></CFormLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                    <CCol xs={6}  >
                      {generateSeriesInputs()}
                    </CCol>
                  </CRow>
                </div>
              )}
            </CRow>
            <hr />
            <CRow>
              <CCol xs={12}>
                <div className="mb-3">
                  <CFormLabel htmlFor="bookType">Book Type  <span className='text-danger'>*</span></CFormLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <CFormCheck inline
                    type="radio"
                    name="bookType"
                    id="bookTypeEAudioBook"
                    value="bookDocumentNAudio"
                    label="E-Book & Audio Book"
                    checked={form.bookType === 'bookDocumentNAudio'}
                    onChange={handleBookTypeChange}
                  />
                  <CFormCheck inline
                    type="radio"
                    name="bookType"
                    id="bookTypeEMagazine"
                    value="bookMagazine"
                    label="E-Magazine"
                    checked={form.bookType === 'bookMagazine'}
                    onChange={handleBookTypeChange}
                  // disabled
                  />
                  <CFormCheck inline
                    type="radio"
                    name="bookType"
                    id="bookTypeENewsPaper"
                    value="bookNewsPaper"
                    label="E-News Paper"
                    checked={form.bookType === 'bookNewsPaper'}
                    onChange={handleBookTypeChange}
                  // disabled
                  />

                  {/* {errors.bookType && <CFormFeedback>{errors.bookType}</CFormFeedback>} */}
                </div>
              </CCol>

            </CRow>
          </div>
        )}

        {currentStep === 2 && (
          <div id='stepTwo'>
            {form.bookType && form.bookType === 'bookDocumentNAudio' && (
              <div id="bookDocumentNAudioInfo">
                <CRow>
                  <CCol xs={12}>
                    <CFormLabel>Complete Source <span className='text-danger'>*</span></CFormLabel>
                    <CFormText className="text-muted" style={{ fontSize: 'small' }}> Please provide the relevant details for each format type: <strong>PDF</strong>, <strong>EPUB</strong>, <strong>TEXT</strong>, and <strong>MP3</strong>. If details is not avaiable, you may leave the fields empty.</CFormText>
                  </CCol>
                  <CCol xs={12}>
                    <CTable bordered className='my-3'>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Format Type</CTableHeaderCell>
                          <CTableHeaderCell>Publisher Name</CTableHeaderCell>
                          <CTableHeaderCell>Published Date</CTableHeaderCell>
                          <CTableHeaderCell>Source</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {form.material.completeMaterials.map((material, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell className='col-2'>
                              <CFormInput
                                name={`complete_${material.formatType.toLowerCase()}_formatType`}
                                value={material.formatType}
                                readOnly
                              />
                            </CTableDataCell>
                            <CTableDataCell className='col-4'>
                              <CFormInput
                                placeholder="Publisher"
                                type="text"
                                name={`complete_${material.formatType.toLowerCase()}_publisher`}
                                value={material.publisher}
                                onChange={(e) => handleCompleteMaterialChange(index, 'publisher', e.target.value)}
                              />
                            </CTableDataCell>
                            <CTableDataCell className='col-3'>
                              <CFormInput
                                placeholder="Published Date"
                                type="date"
                                name={`complete_${material.formatType.toLowerCase()}_publishedDate`}
                                value={material.publishedDate}
                                onChange={(e) => handleCompleteMaterialChange(index, 'publishedDate', e.target.value)}
                              />
                            </CTableDataCell>
                            <CTableDataCell className='col-2'>
                            <Upload
  beforeUpload={(file) => {
    uploadMaterialFile(file, (path) => handleCompleteMaterialSourceChange(index, path), (error) => message.error(error));
    return false; // Prevent default upload behavior
  }}
  fileList={[]}
  accept=".pdf,.epub,.txt,.mp3"
>
  <Button icon={<UploadOutlined />} className='w-100'>Upload File</Button>
</Upload>

                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCol>
                </CRow>
                <hr />
                <CRow>
                  <CCol xs={12}>
                    <CFormLabel>Chapters</CFormLabel>
                    <CFormText className="text-muted" style={{ fontSize: 'small' }}> Enter detailed information for each chapter, including the chapter number, chapter name, and sources for <strong>PDF, EPUB, TEXT,</strong> and <strong>MP3</strong> formats. The MP3 source also requires a duration, voice fields. You can add new chapters by clicking the <strong>+ Add Chapter</strong> button or remove an existing chapter using the <strong>Remove icon</strong> button associated with that chapter.</CFormText>
                  </CCol>
                  <CCol xs={12}>
                    <div className="my-1">
                      <CTable bordered className='my-3'>
                        <CTableBody>
                          {form.chapters.map((chapter, index) => (
                            <React.Fragment key={index}>
                              <CTableRow>
                                <CTableDataCell rowSpan={2} className='col-3'>
                                  <CFormInput
                                    placeholder="Chapter Number"
                                    type="number"
                                    name="chapter_number"
                                    value={chapter.chapter_number}
                                    className="me-2"
                                    readOnly
                                  />
                                </CTableDataCell>
                                <CTableDataCell colSpan={4}>
                                  <div className="d-flex align-items-center">
                                    <CFormInput
                                      placeholder="Chapter Name"
                                      type="text"
                                      name="chapter_name"
                                      value={chapter.chapter_name}
                                      className="me-2"
                                      onChange={(e) => handleChapterChange(index, e)}
                                    />
                                    <CButton color="danger" size="sm" onClick={() => handleChapterRemoval(index)}>
                                      <CIcon icon={cilDelete} />
                                    </CButton>
                                  </div>
                                </CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                              <CTableDataCell>
  <Upload
    beforeUpload={(file) => {
      uploadMaterialFile(file, (path) => handleChapterMaterialSourceChange(index, 'pdf', path), (error) => message.error(error));
      return false; // Prevent default upload behavior
    }}
    fileList={[]}
    accept=".pdf"
  >
    <Button icon={<UploadOutlined />} className='w-100'>Upload PDF</Button>
  </Upload>
</CTableDataCell>

<CTableDataCell>
  <Upload
    beforeUpload={(file) => {
      uploadMaterialFile(file, (path) => handleChapterMaterialSourceChange(index, 'epub', path), (error) => message.error(error));
      return false; // Prevent default upload behavior
    }}
    fileList={[]}
    accept=".epub"
  >
    <Button icon={<UploadOutlined />} className='w-100'>Upload EPUB</Button>
  </Upload>
</CTableDataCell>

<CTableDataCell>
  <Upload
    beforeUpload={(file) => {
      uploadMaterialFile(file, (path) => handleChapterMaterialSourceChange(index, 'text', path), (error) => message.error(error));
      return false; // Prevent default upload behavior
    }}
    fileList={[]}
    accept=".txt"
  >
    <Button icon={<UploadOutlined />} className='w-100'>Upload TXT</Button>
  </Upload>
</CTableDataCell>

<CTableDataCell>
  <CInputGroup>
    <Upload
      beforeUpload={(file) => {
        uploadMaterialFile(file, (path) => handleChapterMaterialSourceChange(index, 'mp3', path), (error) => message.error(error));
        return false; // Prevent default upload behavior
      }}
      fileList={[]}
      accept=".mp3"
    >
      <Button icon={<UploadOutlined />} className='w-100'>Upload MP3</Button>
    </Upload>
    <CFormSelect
      name="chapter_mp3_voice"
      value={chapter.chapter_mp3_voice}
      className="me-2 col-2"
      onChange={(e) => handleChapterChange(index, e)}
    >
      <option value="" disabled>Voice...</option>
      <option value="mix">Mix</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </CFormSelect>
  </CInputGroup>
</CTableDataCell>


                              </CTableRow>
                            </React.Fragment>
                          ))}
                        </CTableBody>
                      </CTable>

                      <div className='d-flex justify-content-start'>
                        <CButton color="primary" onClick={handleChapterAddition}>+ Add Chapter</CButton>
                      </div>

                    </div>
                  </CCol>
                </CRow>
              </div>
            )}
            {form.bookType && form.bookType === 'bookMagazine' && (
              <div id="bookMagazineInfo">
                <CRow>
                  <CCol xs={12}>
                    <div className="mb-3">
                      E-MAGAZINE SECTION
                    </div>
                  </CCol>
                </CRow>
              </div>
            )}
            {form.bookType && form.bookType === 'bookNewsPaper' && (
              <div id="bookNewsPaperInfo">
                <CRow>
                  <CCol xs={12}>
                    <div className="mb-3">
                      E-NEWS PAPER SECTION
                    </div>
                  </CCol>
                </CRow>
              </div>
            )}
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

      <MaterialFormModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onFileUpload={handleMaterialFileUpload}
      />
    </>
  );
};

export default BookForm;
