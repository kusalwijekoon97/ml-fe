import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CContainer, CRow, CCol, CSpinner } from '@coreui/react';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';
import { Link, useNavigate } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import AuthorForm from '../../../components/forms/AuthorForm';

const CreateAuthor = () => {
  const navigate = useNavigate();
  const [libraryOptions, setLibraryOptions] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [addedBooks, setAddedBooks] = useState([{
    added_book_number: 1,
    added_book_library: '',
    added_book_name: '',
    added_book_source_isbn: ''
  }]);
  const [accounts, setAccounts] = useState([{
    name: '',
    bank: '',
    branch: '',
    accountNumber: '',
    accountType: '',
    currency: '',
    swiftCode: '',
    iban: '',
    description: ''
  }]);

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

  const handleLibraryChange = (selectedLibraryOptions) => {
    setForm({ ...form, library: selectedLibraryOptions });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const diedOptions = [
    { value: '', label: 'Select...' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  // Handle change for the react-select component
  const handleDiedChange = (selectedOption) => {
    handleChange({
      target: {
        name: 'died',
        value: selectedOption ? selectedOption.value : ''
      }
    });
  };

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    died: 'no',
    penName: '',
    nationality: '',
    firstPublishDate: '',
    description: '',
    profileImage: null,
    position: '',
    addedBooks: [
      {
        added_book_number: 1,
        added_book_library: '',
        added_book_name: '',
        added_book_isbn: ''
      }
    ],
    accounts: [
      {
        name: '',
        bank: '',
        branch: '',
        accountNumber: '',
        accountType: '',  // e.g., "Personal", "Business"
        currency: '',  // e.g., "USD", "EUR"
        swiftCode: '',  // Optional for international accounts
        iban: '',  // Optional for international accounts
        description: ''
      }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    died: '',
    penName: '',
    nationality: '',
    firstPublishDate: '',
    description: '',
    profileImage: '',
    position: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (file) => {
    setForm({ ...form, profileImage: file });
  };

  const handleAddedBookAddition = () => {
    setForm(prevForm => ({
      ...prevForm,
      addedBooks: [
        ...prevForm.addedBooks,
        {
          added_book_number: prevForm.addedBooks.length + 1,
          added_book_library: '',
          added_book_name: '',
          added_book_source_isbn: ''
        }
      ]
    }));
  };

  const handleAccountAddition = () => {
    setForm(prevForm => ({
      ...prevForm,
      accounts: [
        ...prevForm.accounts,
        {
          name: '',
          bank: '',
          branch: '',
          accountNumber: '',
          accountType: '',
          currency: '',
          swiftCode: '',
          iban: '',
          description: ''
        }
      ]
    }));
  };

  // Handle addedBook removal
  const handleAddedBookRemoval = (index) => {
    setForm(prevForm => {
      const updatedAddedBooks = prevForm.addedBooks.filter((_, i) => i !== index);
      updatedAddedBooks.forEach((addedBook, i) => {
        addedBook.added_book_number = i + 1;
      });
      return {
        ...prevForm,
        addedBooks: updatedAddedBooks
      };
    });
  };

  // Handle account removal
  const handleAccountRemoval = (index) => {
    setForm(prevForm => {
      const updatedAccounts = prevForm.accounts.filter((_, i) => i !== index);
      return {
        ...prevForm,
        accounts: updatedAccounts
      };
    });
  };

  // Handle addedBook field change
  const handleAddedBookChange = (index, e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      addedBooks: prevForm.addedBooks.map((addedBook, i) =>
        i === index ? { ...addedBook, [name]: value } : addedBook
      )
    }));
  };

  // Handle account field change
  const handleAccountChange = (index, e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      accounts: prevForm.accounts.map((account, i) =>
        i === index ? { ...account, [name]: value } : account
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstname) newErrors.firstname = 'First name is mandatory.';
    if (!form.lastname) newErrors.lastname = 'Last name is mandatory.';
    if (!form.penName) newErrors.penName = 'Pen name is mandatory.';
    if (!form.nationality) newErrors.nationality = 'Nationality is mandatory.';
    if (!form.firstPublishDate) newErrors.firstPublishDate = 'First publish date is mandatory.';
    if (!form.description) newErrors.description = 'Description is mandatory.';
    // if (!form.profileImage) newErrors.profileImage = 'Profile image is mandatory.';
    if (!form.position) newErrors.position = 'Position is mandatory.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("btn clicked");

    if (!validateForm()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('firstname', form.firstname);
    formData.append('lastname', form.lastname);
    formData.append('died', form.died);
    formData.append('penName', form.penName);
    formData.append('nationality', form.nationality);
    formData.append('firstPublishDate', form.firstPublishDate);
    formData.append('description', form.description);
    formData.append('profileImage', form.profileImage);
    formData.append('position', form.position);

    form.addedBooks.forEach((addedBook, index) => {
      formData.append(`addedBooks[${index}][added_book_number]`, addedBook.added_book_number);
      formData.append(`addedBooks[${index}][added_book_library]`, addedBook.added_book_library);
      formData.append(`addedBooks[${index}][added_book_name]`, addedBook.added_book_name);
      formData.append(`addedBooks[${index}][added_book_isbn]`, addedBook.added_book_isbn);
    });

    form.accounts.forEach((account, index) => {
      formData.append(`accounts[${index}][name]`, account.name);
      formData.append(`accounts[${index}][bank]`, account.bank);
      formData.append(`accounts[${index}][branch]`, account.branch);
      formData.append(`accounts[${index}][accountNumber]`, account.accountNumber);
      formData.append(`accounts[${index}][accountType]`, account.accountType);
      formData.append(`accounts[${index}][currency]`, account.currency);
      formData.append(`accounts[${index}][swiftCode]`, account.swiftCode || '');
      formData.append(`accounts[${index}][iban]`, account.iban || '');
      formData.append(`accounts[${index}][description]`, account.description || '');
    });


    console.log(formData);

    axios.post(`${base_url}/api/authors/store`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setLoading(false);
        navigate("/authors", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Author created successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Author creation failed. Please try again.'
        });
        console.error(error);
      });
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader title="Authors" />
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
                    title="Author"
                    subtitle="create"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Authors"
                    linkTo="/authors"
                  />
                  <CCardBody>
                    <AuthorForm
                      form={form}
                      errors={errors}
                      diedOptions={diedOptions}
                      handleDiedChange={handleDiedChange}
                      handleChange={handleChange}
                      handleFileChange={handleFileChange}
                      handleSubmit={handleSubmit}
                      handlePrevious={handlePrevious}
                      loading={loading}
                      handleNextStep={handleNextStep}
                      handlePreviousStep={handlePreviousStep}
                      currentStep={currentStep}
                      addedBooks={addedBooks}
                      handleAddedBookAddition={handleAddedBookAddition}
                      handleAddedBookRemoval={handleAddedBookRemoval}
                      handleAddedBookChange={handleAddedBookChange}
                      accounts={accounts}
                      handleAccountAddition={handleAccountAddition}
                      handleAccountRemoval={handleAccountRemoval}
                      handleAccountChange={handleAccountChange}
                      libraryOptions={libraryOptions}
                      handleLibraryChange={handleLibraryChange}
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

export default CreateAuthor;
