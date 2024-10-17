import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CContainer, CRow, CCol, CSpinner, CNavLink, CNavItem, CNav } from '@coreui/react';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import AuthorFormEditGeneral from '../../../components/forms/AuthorFormEditGeneral';
import AuthorFormEditAccount from '../../../components/forms/AuthorFormEditAccount';
import AuthorFormEditBook from '../../../components/forms/AuthorFormEditBook';

const EditAuthor = () => {
  const navigate = useNavigate();
  const { authorId } = useParams();
  const [activeTab, setActiveTab] = useState('general');

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });

  const diedOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const [formGeneral, setFormGeneral] = useState({
    firstname: '',
    lastname: '',
    died: '',
    penName: '',
    nationality: '',
    firstPublishDate: '',
    description: '',
    profileImage: '',
    position: ''
  });

  const [accounts, setAccounts] = useState([{
    _id: '',
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

  const [addedBooks, setAddedBooks] = useState([{
    added_book_library: '',
    added_book_name: '',
    added_book_source_isbn: ''
  }]);

  const [errorsGeneralInfo, setErrorsGeneralInfo] = useState({
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

  const [errorsAccountInfo, setErrorsAccountInfo] = useState([
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
  ]);

  const [errorsAddedBooksInfo, setErrorsAddedBooksInfo] = useState([
    {
      added_book_library: '',
      added_book_name: '',
      added_book_source_isbn: ''
    }
  ]);

  const handleAccountAddition = () => {
    setAccounts(prevAccounts => [
      ...prevAccounts,
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
    ]);
  };

  const handleAccountChange = (index, field, value) => {
    const updatedAccounts = accounts.map((account, i) =>
      i === index ? { ...account, [field]: value } : account
    );
    setAccounts(updatedAccounts);
  };


  const handleAccountRemoval = (index) => {
    const updatedAccounts = accounts.filter((_, i) => i !== index);
    setAccounts(updatedAccounts);
  };

  const validateAccountInfo = () => {
    const newErrorsAccountInfo = {};

    // Add your validation logic for each account field if needed
    setErrorsAccountInfo(newErrorsAccountInfo);
    return Object.keys(newErrorsAccountInfo).length === 0;
  };

  const handleAccountInfoSubmit = (e) => {
    e.preventDefault();

    if (!validateAccountInfo()) return;

    setLoading(true);

    // const formData = new FormData();
    // formData.append('accounts', JSON.stringify(accounts));

    axios.post(`${base_url}/api/authors/update/account-info/${authorId}`, {
      accounts: accounts
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setLoading(false);
        navigate("/authors", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Author account details updated successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Author account details update failed. Please try again.'
        });
        console.error(error);
      });
  };

  const handleAddedBookAddition = () => {
    setAddedBooks(prevAddedBooks => [
      ...prevAddedBooks,
      {
        added_book_library: '',
        added_book_name: '',
        added_book_source_isbn: ''
      }
    ]);
  };

  const handleAddedBookChange = (index, field, value) => {
    const updatedAddedBooks = addedBooks.map((addedBook, i) =>
      i === index ? { ...addedBook, [field]: value } : addedBook
    );
    setAddedBooks(updatedAddedBooks);
  };

  const handleAddedBookRemoval = (index) => {
    const updatedAddedBooks = addedBooks.filter((_, i) => i !== index);
    setAddedBooks(updatedAddedBooks);
  };

  const validateAddedBookInfo = () => {
    const newErrorsAddedBookInfo = {};

    // Add your validation logic for each addedBook field if needed
    setErrorsAddedBooksInfo(newErrorsAddedBookInfo);
    return Object.keys(newErrorsAddedBookInfo).length === 0;
  };

  const handleAddedBookInfoSubmit = (e) => {
    e.preventDefault();

    if (!validateAddedBookInfo()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('addedBooks', JSON.stringify(addedBooks));

    axios.post(`${base_url}/api/authors/update/added-book-info/${authorId}`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setLoading(false);
        navigate("/authors", {
          state: {
            alert: {
              visible: true,
              type: 'success',
              message: 'Author addedBook details updated successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Author addedBook details update failed. Please try again.'
        });
        console.error(error);
      });
  };

  const handleGeneralInfoChange = (e) => {
    const { name, value } = e.target;
    setFormGeneral({ ...formGeneral, [name]: value });
    setErrorsGeneralInfo({ ...errorsGeneralInfo, [name]: '' });
  };

  const handleFileChange = (file) => {
    setFormGeneral({ ...formGeneral, profileImage: file });
  };

  const handleDiedChange = (selectedOption) => {
    handleGeneralInfoChange({
      target: {
        name: 'died',
        value: selectedOption ? selectedOption.value : ''
      }
    });
  };

  const validateFormGeneral = () => {
    const newErrorsGeneralInfo = {};

    // if (!formGeneral.firstname) newErrorsGeneralInfo.firstname = 'First name is mandatory.';
    // if (!formGeneral.lastname) newErrorsGeneralInfo.lastname = 'Last name is mandatory.';
    // if (!formGeneral.penName) newErrorsGeneralInfo.penName = 'Pen name is mandatory.';
    // if (!formGeneral.nationality) newErrorsGeneralInfo.nationality = 'Nationality is mandatory.';
    // if (!formGeneral.firstPublishDate) newErrorsGeneralInfo.firstPublishDate = 'First publish date is mandatory.';
    // if (!formGeneral.description) newErrorsGeneralInfo.description = 'Description is mandatory.';
    // if (formGeneral.profileImage instanceof File) formData.append('profileImage', formGeneral.profileImage); // Only append if it's a File object
    // if (!formGeneral.position) newErrorsGeneralInfo.position = 'Position is mandatory.';

    setErrorsGeneralInfo(newErrorsGeneralInfo);
    return Object.keys(newErrorsGeneralInfo).length === 0;
  };

  const handleGeneralInfoSubmit = (e) => {
    e.preventDefault();

    if (!validateFormGeneral()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('firstname', formGeneral.firstname);
    formData.append('lastname', formGeneral.lastname);
    formData.append('died', formGeneral.died);
    formData.append('penName', formGeneral.penName);
    formData.append('nationality', formGeneral.nationality);
    formData.append('firstPublishDate', formGeneral.firstPublishDate);
    formData.append('description', formGeneral.description);
    if (form.profileImage) formData.append('profileImage', formGeneral.profileImage);
    formData.append('position', formGeneral.position);

    axios.post(`${base_url}/api/authors/update/general-info/${authorId}`, formData, {
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
              message: 'Author updated successfully!'
            }
          }
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Author update failed. Please try again.'
        });
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/api/authors/${authorId}`);
        const data = response.data.data;

        setFormGeneral({
          firstname: data.generalInfo.firstname,
          lastname: data.generalInfo.lastname,
          died: data.generalInfo.died,
          penName: data.generalInfo.penName,
          nationality: data.generalInfo.nationality,
          firstPublishDate: data.generalInfo.firstPublishDate
            ? new Date(data.generalInfo.firstPublishDate).toISOString().split('T')[0]
            : '',
          description: data.generalInfo.description,
          position: data.generalInfo.position,
          profileImage: data.generalInfo.profileImage,
        });

        setAccounts(
          Array.isArray(data.accountInfo)
            ? data.accountInfo.map((accountInfo) => ({
              _id: accountInfo._id,
              name: accountInfo.name,
              bank: accountInfo.bank,
              branch: accountInfo.branch,
              accountNumber: accountInfo.accountNumber,
              accountType: accountInfo.accountType,
              currency: accountInfo.currency,
              swiftCode: accountInfo.swiftCode,
              iban: accountInfo.iban,
              description: accountInfo.description,
            }))
            : []
        );

        setAddedBooks(
          Array.isArray(data.addedBooks)
            ? data.addedBooks.map((book) => ({
              added_book_name: book.name,
              added_book_source_isbn: book.isbn,
            }))
            : []
        );

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          visible: true,
          type: 'failure',
          message: 'Failed to load author data. Please try again.',
        });
        console.error(error);
      }
    };

    fetchAuthorData();
  }, [authorId]);


  const handlePrevious = () => {
    navigate(-1);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
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
                    subtitle="edit"
                    buttonIcon={<CIcon icon={cilList} />}
                    buttonText="Authors"
                    linkTo="/authors"
                  />
                  <CCardBody>
                    <CNav variant="tabs">
                      <CNavItem>
                        <CNavLink
                          href="#"
                          active={activeTab === 'general'}
                          onClick={() => handleTabClick('general')}
                        >
                          General Information
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink
                          href="#"
                          active={activeTab === 'book'}
                          onClick={() => handleTabClick('book')}
                        >
                          Book Information
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink
                          href="#"
                          active={activeTab === 'income'}
                          onClick={() => handleTabClick('income')}
                        >
                          Income Information
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink
                          href="#"
                          active={activeTab === 'account'}
                          onClick={() => handleTabClick('account')}
                        >
                          Account Information
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink
                          href="#"
                          active={activeTab === 'social'}
                          onClick={() => handleTabClick('social')}
                        >
                          Social Media
                        </CNavLink>
                      </CNavItem>
                    </CNav>

                    {/* Conditionally render content for each tab */}
                    <div className="mt-4">
                      {activeTab === 'general' && (
                        <div>
                          {/* Render General Information Content */}
                          <h5>General Information</h5>
                          <AuthorFormEditGeneral
                            form={formGeneral}
                            errors={errorsGeneralInfo}
                            diedOptions={diedOptions}
                            handleDiedChange={handleDiedChange}
                            handleChange={handleGeneralInfoChange}
                            handleFileChange={handleFileChange}
                            handleSubmit={handleGeneralInfoSubmit}
                            handlePrevious={handlePrevious}
                            loading={loading}
                          />
                        </div>
                      )}
                      {activeTab === 'book' && (
                        <div>
                          {/* Render Book Information Content */}
                          <h5>Book Information</h5>
                          <AuthorFormEditBook
                            form={formGeneral}
                            errors={errorsAddedBooksInfo}
                            addedBooks={addedBooks}
                            handleAddedBookAddition={handleAddedBookAddition}
                            handleAddedBookRemoval={handleAddedBookRemoval}
                            handleAddedBookChange={handleAddedBookChange}
                            handleSubmit={handleAddedBookInfoSubmit}
                            handlePrevious={handlePrevious}
                            loading={loading}
                          />
                        </div>
                      )}
                      {activeTab === 'income' && (
                        <div>
                          {/* Render Income Information Content */}
                          <h5>Income Information</h5>
                          <p>Details about the income generated by the author.</p>
                        </div>
                      )}
                      {activeTab === 'account' && (
                        <div>
                          {/* Render Account Information Content */}
                          <h5>Account Information</h5>
                          <AuthorFormEditAccount
                            form={formGeneral}
                            errors={errorsAccountInfo}
                            accounts={accounts}
                            handleAccountAddition={handleAccountAddition}
                            handleAccountRemoval={handleAccountRemoval}
                            handleAccountChange={handleAccountChange}
                            handleSubmit={handleAccountInfoSubmit}
                            handlePrevious={handlePrevious}
                            loading={loading}
                          />
                        </div>
                      )}
                      {activeTab === 'social' && (
                        <div>
                          {/* Render Social Media Content */}
                          <h5>Social Media</h5>
                          <p>Author's social media profiles and links.</p>
                        </div>
                      )}
                    </div>
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

export default EditAuthor;
