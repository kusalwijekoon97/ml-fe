import React, { useState, useEffect } from 'react';
import {CCard,CCardBody,CContainer,CRow,CCol,CSpinner} from '@coreui/react';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import BookFormEdit from '../../../components/forms/BookFormEdit';

const EditBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    author: null,
    translator: null,
    isbn: '',
    coverImage: null,
    publisher: '',
    publishDate: '',
    library: '',
    category: [],
    subCategory: [],
    description: '',
    hasSeries: false,
    noOfSeries: 1,
    bookType: 'bookDocumentNAudio',
    material: {
      completeMaterials: [
        {
          formatType: 'PDF',
          publisher: '',
          publishedDate: '',
          source: null,
        },
        {
          formatType: 'EPUB',
          publisher: '',
          publishedDate: '',
          source: null,
        },
        {
          formatType: 'TEXT',
          publisher: '',
          publishedDate: '',
          source: null,
        },
        {
          formatType: 'MP3',
          publisher: '',
          publishedDate: '',
          source: null,
        }
      ]
    },
    chapters: [
      {
        chapter_number: 1,
        chapter_name: '',
        chapter_source_pdf: '',
        chapter_source_epub: '',
        chapter_source_text: '',
        chapter_source_mp3: '',
        chapter_mp3_voice: '',
      }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });
  const [errors, setErrors] = useState({
    name: '',
    author: null,
    translator: null,
    isbn: '',
    coverImage: null,
    publisher: '',
    publishDate: '',
    library: '',
    category: [],
    subCategory: [],
    description: '',
    hasSeries: ''
  });
  const [authorOptions, setAuthorOptions] = useState([]);
  const [libraryOptions, setLibraryOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setsubCategoryOptions] = useState([]);
  // series from backend => now dummy
  const [seriesOptions, setSeriesOptions] = useState([
    { value: 1, label: 'Series 1' },
    { value: 2, label: 'Series 2' },
    { value: 3, label: 'Series 3' },
    { value: 4, label: 'Series 4' },
    { value: 5, label: 'Series 5' },
  ]);
  const materialEAFormats = ['PDF', 'EPUB', 'TEXT', 'MP3'];
  const [materialOptions, setMaterialOptions] = useState([]);
  // chapters
  const [chapters, setChapters] = useState([
    { chapter_number: 1, chapter_name: '', chapter_source_pdf: '', chapter_source_epub: '', chapter_source_text: '', chapter_source_mp3: '', chapter_mp3_voice: '' }
  ]);

  useEffect(() => {
    const fetchBookData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${base_url}/api/books/${bookId}`);
            const data = response.data;

            console.log(data);

            // Map the fetched data to the form structure
            setForm({
              name: data.name || '',
              author: data.authorId || null,
              translator: data.translatorId || null,
              isbn: data.isbn || '',
              coverImage: data.coverImage || null,
              publisher: data.publisher || '',
              publishDate: data.publishDate || '',
              library: data.library || '',
              category: data.category || [],
              subCategory: data.subCategory || [],
              description: data.description || '',
              hasSeries: data.series && data.series.length > 0,
              noOfSeries: data.series?.length || 1,
              bookType: data.type || 'bookDocumentNAudio',
              material: {
                  completeMaterials: data.material?.map((material, index) => ({
                      formatType: material.formatType || form.material.completeMaterials[index]?.formatType || '',
                      publisher: material.publisher || '', // Adjust this if the publisher info is nested differently
                      publishedDate: material.publishDate || '', // Adjust this if the date info is nested differently
                      source: material.completeSource || null,
                      chapters: material.chapters?.map(chapter => ({
                          chapter_number: chapter.chapterNumber || '',
                          chapter_name: chapter.chapterName || '',
                          chapter_source_pdf: material.formatType === 'PDF' ? chapter.source || '' : '',
                          chapter_source_epub: material.formatType === 'EPUB' ? chapter.source || '' : '',
                          chapter_source_text: material.formatType === 'TEXT' ? chapter.source || '' : '',
                          chapter_source_mp3: material.formatType === 'AUDIO_BOOK' ? chapter.source || '' : '',
                          chapter_mp3_voice: material.formatType === 'AUDIO_BOOK' ? 'Generated or Uploaded Voice Data' : '', // Adjust this logic if necessary
                      })) || []
                  })) || []
              }
          });
          setLoading(false);

        } catch (error) {
            setLoading(false);
            setAlert({
                visible: true,
                type: 'failure',
                message: 'Failed to load book data. Please try again.'
            });
            console.error(error);
        }
    };

    fetchBookData();
}, [bookId]);



  // handling form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: '' });
  };

  // handling cover image changing
  const handleCoverImageChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
    setErrors({ ...errors, [name]: '' });
  };
  // fetching all open authors
  useEffect(() => {
    axios.get(`${base_url}/api/authors/all-open`)
      .then(response => {
        const authors = response.data.data.map(author => ({
          value: author._id,
          label: author.firstname + ' ' + author.lastname
        }));
        setAuthorOptions(authors);
      })
      .catch(error => {
        console.error("There was an error fetching the authors!", error);
      });
  }, []);
  // handling author change
  const handleAuthorChange = (selectedAuthorOptions) => {
    setForm({ ...form, author: selectedAuthorOptions });
    setErrors({ ...errors, author: '' });
  };
  // handle translator changing
  const handleTranslatorChange = (selectedTranslatorOptions) => {
    setForm({ ...form, translator: selectedTranslatorOptions });
    setErrors({ ...errors, translator: '' });
  };
  // fetching libraries
  useEffect(() => {
    axios.get(`${base_url}/api/libraries/all-open`)
      .then(response => {
        const libraries = response.data.data.map(library => ({
          value: library._id,
          label: library.name
        }));
        setLibraryOptions(libraries);
      })
      .catch(error => {
        console.error("There was an error fetching the libraries!", error);
      });
  }, []);
  // handling library changing
  const handleLibraryChange = (selectedLibraryOptions) => {
    setForm({ ...form, library: selectedLibraryOptions });
    setErrors({ ...errors, library: '' });

    const selectedLibraryId = selectedLibraryOptions ? selectedLibraryOptions.value : null;

    if (selectedLibraryId) {
      axios.get(`${base_url}/api/categories/main/all-filtered/${selectedLibraryId}`)
        .then(response => {
          const categories = response.data.data.map(category => ({
            value: category._id,
            label: category.name
          }));
          setCategoryOptions(categories);
          setsubCategoryOptions([]); // Clear subcategories when library changes
        })
        .catch(error => {
          console.error("There was an error fetching the categories!", error);
          setCategoryOptions([]); // Clear categories in case of error
        });
    } else {
      setCategoryOptions([]);
      setsubCategoryOptions([]);
    }
  };
  // handling main categories changing
  const handleCategoryChange = (selectedCategoryOptions) => {
    setForm({ ...form, category: selectedCategoryOptions });
    setErrors({ ...errors, category: '' });

    if (selectedCategoryOptions && selectedCategoryOptions.length > 0) {
      // Collect all selected category IDs
      const selectedCategoryIds = selectedCategoryOptions.map(option => option.value);

      // Fetch subcategories for all selected categories
      axios.get(`${base_url}/api/categories/sub/all-open`, {
        params: {
          ids: selectedCategoryIds.join(',') // Join multiple IDs into a comma-separated string
        }
      })
        .then(response => {
          const subCategories = response.data.data.map(subCategory => ({
            value: subCategory._id,
            label: subCategory.name
          }));
          setsubCategoryOptions(subCategories);
        })
        .catch(error => {
          console.error("There was an error fetching the subcategories!", error);
          setsubCategoryOptions([]); // Clear subcategories in case of error
        });
    } else {
      setsubCategoryOptions([]);
    }
  };
  // handling sub categories changing
  const handleSubCategoryChange = (selectedSubCategoryOptions) => {
    setForm({ ...form, subCategory: selectedSubCategoryOptions });
    setErrors({ ...errors, subCategory: '' });
  };
  // fetching all open materials
  useEffect(() => {
    axios.get(`${base_url}/api/materials/all-open`)
      .then(response => {
        const materials = response.data.data.map(material => ({
          value: material.material_path,
          label: material.name
        }));
        setMaterialOptions(materials);
      })
      .catch(error => {
        console.error("There was an error fetching the materials!", error);
      });
  }, []);
  // handling material change
  const handleMaterialChange = (selectedMaterialOptions) => {
    setForm({ ...form, material: selectedMaterialOptions });
    setErrors({ ...errors, material: '' });
  };
  const validateForm = () => {
    const newErrors = {};

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // handling hasSeries radio btn changing
  const handleHasSeriesChange = (e) => {
    const value = e.target.value === 'True';
    setForm({ ...form, hasSeries: value });
    setErrors({ ...errors, hasSeries: '' });
  };
  // generating previous series inputs based on noOfSeries
  const generateSeriesInputs = () => {
    const inputs = [];
    for (let i = 1; i < form.noOfSeries; i++) {
      inputs.push(
        <div className="mb-3" key={i} id={`divPreviousSeries${i}`}>
          <CFormLabel htmlFor={`previousSeries${i}`}>Series {i}</CFormLabel>
          <Select
            id={`previousSeries${i}`}
            name={`previousSeries${i}`}
            options={seriesOptions}
          />
        </div>
      );
    }
    return inputs;
  };
  // handling seriesNumberIncrease changing
  const seriesNumberIncrease = () => {
    setForm(prevForm => ({ ...prevForm, noOfSeries: prevForm.noOfSeries + 1 }));
  };
  // handling seriesNumberDecrease changing
  const seriesNumberDecrease = () => {
    setForm(prevForm => ({ ...prevForm, noOfSeries: Math.max(prevForm.noOfSeries - 1, 1) }));
  };
  // handling bookType radio btn changing
  const handleBookTypeChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, bookType: value });
    console.log(form.bookType);
    // setErrors({ ...errors, bookType: '' });
  };
  // handling complete materials changing
  const handleCompleteMaterialChange = (index, field, value) => {
    setForm((prevForm) => {
      // Validate field
      if (!['publisher', 'publishedDate'].includes(field)) {
        console.error('Invalid field name');
        return prevForm;
      }
      // Update the material array
      const updatedMaterials = prevForm.material.completeMaterials.map((material, i) =>
        i === index ? { ...material, [field]: value } : material
      );
      // Return updated form
      return {
        ...prevForm,
        material: { completeMaterials: updatedMaterials },
      };
    });
  };
  // handling complete materials dropdown changing
  const handleCompleteMaterialSourceChange = (index, selectedOption) => {
    setForm((prevForm) => {
      const updatedMaterials = prevForm.material.completeMaterials.map((material, i) =>
        i === index ? { ...material, source: selectedOption?.value || null } : material
      );

      return {
        ...prevForm,
        material: { completeMaterials: updatedMaterials },
      };
    });
  };


  // Handling chapter addition
  const handleChapterAddition = () => {
    setForm(prevForm => ({
      ...prevForm,
      chapters: [
        ...prevForm.chapters,
        {
          chapter_number: prevForm.chapters.length + 1,
          chapter_name: '',
          chapter_source_pdf: '',
          chapter_source_epub: '',
          chapter_source_text: '',
          chapter_source_mp3: '',
          chapter_mp3_voice: ''
        }
      ]
    }));
  };

  // Handle chapter removal
  const handleChapterRemoval = (index) => {
    setForm(prevForm => {
      const updatedChapters = prevForm.chapters.filter((_, i) => i !== index);
      updatedChapters.forEach((chapter, i) => {
        chapter.chapter_number = i + 1;
      });
      return {
        ...prevForm,
        chapters: updatedChapters
      };
    });
  };

  // Handle chapter field change
  const handleChapterChange = (index, e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      chapters: prevForm.chapters.map((chapter, i) =>
        i === index ? { ...chapter, [name]: value } : chapter
      )
    }));
  };

  // Handle chapter material source change
  const handleChapterMaterialSourceChange = (index, materialType, selectedOption) => {
    setForm(prevForm => ({
      ...prevForm,
      chapters: prevForm.chapters.map((chapter, i) =>
        i === index ? { ...chapter, [`chapter_source_${materialType}`]: selectedOption ? selectedOption.value : '' } : chapter
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Populating FormData with form state data
    formData.append('name', form.name);
    if (form.author) formData.append('author', form.author.value);
    if (form.translator) formData.append('translator', form.translator.value);
    formData.append('isbn', form.isbn);
    if (form.coverImage) formData.append('coverImage', form.coverImage);
    formData.append('publisher', form.publisher);
    formData.append('publishDate', form.publishDate);
    if (form.library) formData.append('library', form.library.value);
    if (form.category) form.category.forEach(category => formData.append('category[]', category.value));
    if (form.subCategory) form.subCategory.forEach(subCategory => formData.append('subCategory[]', subCategory.value));
    formData.append('description', form.description);
    formData.append('hasSeries', form.hasSeries);
    formData.append('noOfSeries', form.noOfSeries);
    formData.append('bookType', form.bookType);

    form.material.completeMaterials.forEach((material, index) => {
      formData.append(`material[completeMaterials][${index}][formatType]`, material.formatType);
      formData.append(`material[completeMaterials][${index}][publisher]`, material.publisher);
      formData.append(`material[completeMaterials][${index}][publishedDate]`, material.publishedDate);
      if (material.source) {
        formData.append(`material[completeMaterials][${index}][source]`, material.source);
      }
    });

    // Append chapter data
    form.chapters.forEach((chapter, index) => {
      formData.append(`material[chapters][${index}][chapter_number]`, chapter.chapter_number);
      formData.append(`material[chapters][${index}][chapter_name]`, chapter.chapter_name);
      formData.append(`material[chapters][${index}][chapter_source_pdf]`, chapter.chapter_source_pdf);
      formData.append(`material[chapters][${index}][chapter_source_epub]`, chapter.chapter_source_epub);
      formData.append(`material[chapters][${index}][chapter_source_text]`, chapter.chapter_source_text);
      formData.append(`material[chapters][${index}][chapter_source_mp3]`, chapter.chapter_source_mp3);
      formData.append(`material[chapters][${index}][chapter_mp3_voice]`, chapter.chapter_mp3_voice);
    });

    axios.post(`${base_url}/api/books/update/${bookId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setLoading(false);
        navigate("/books", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Book updated successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Book update failed. Please try again.'
        });
        console.error(error);
      });
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader title="Books" />
        <div className="body flex-grow-1">
          <ResponseAlert
            visible={alert.visible}
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ ...alert, visible: false })}
          />
          <CContainer className="px-1" lg>
            <CRow>
              <CCol xs={12}>
                <CCard className="mb-4 border-top-primary border-top-3">
                  <CardHeaderWithTitleBtn
                    title="Book"
                    subtitle="edit"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Books"
                    linkTo="/books"
                  />
                  <CCardBody>
                    <BookFormEdit
                      form={form}
                      errors={errors}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      handlePrevious={handlePrevious}
                      handleNextStep={handleNextStep}
                      handlePreviousStep={handlePreviousStep}
                      currentStep={currentStep}
                      handleCoverImageChange={handleCoverImageChange}
                      authorOptions={authorOptions}
                      handleAuthorChange={handleAuthorChange}
                      handleTranslatorChange={handleTranslatorChange}
                      libraryOptions={libraryOptions}
                      handleLibraryChange={handleLibraryChange}
                      categoryOptions={categoryOptions}
                      handleCategoryChange={handleCategoryChange}
                      subCategoryOptions={subCategoryOptions}
                      handleSubCategoryChange={handleSubCategoryChange}
                      handleHasSeriesChange={handleHasSeriesChange}
                      seriesNumberIncrease={seriesNumberIncrease}
                      seriesNumberDecrease={seriesNumberDecrease}
                      seriesOptions={seriesOptions}
                      generateSeriesInputs={generateSeriesInputs}
                      handleBookTypeChange={handleBookTypeChange}
                      materialEAFormats={materialEAFormats}
                      materialOptions={materialOptions}
                      handleMaterialChange={handleMaterialChange}
                      handleCompleteMaterialChange={handleCompleteMaterialChange}
                      handleCompleteMaterialSourceChange={handleCompleteMaterialSourceChange}
                      chapters={chapters}
                      handleChapterAddition={handleChapterAddition}
                      handleChapterRemoval={handleChapterRemoval}
                      handleChapterChange={handleChapterChange}
                      handleChapterMaterialSourceChange={handleChapterMaterialSourceChange}
                      loading={loading}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default EditBook;
