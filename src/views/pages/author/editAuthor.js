import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CContainer, CRow, CCol, CSpinner, CNavLink, CNavItem, CNav, CPagination, CPaginationItem, CInputGroup, CInputGroupText, CFormInput } from '@coreui/react';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import CIcon from '@coreui/icons-react';
import { cilList, cibAddthis, cilSearch } from '@coreui/icons';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import base_url from "../../../utils/api/base_url";
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import AuthorFormEditGeneral from '../../../components/forms/AuthorFormEditGeneral';
import AuthorFormEditAccount from '../../../components/forms/AuthorFormEditAccount';
import AuthorFormEditBook from '../../../components/forms/AuthorFormEditBook';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import BooksTable from '../../../components/table/BooksTable';

const EditAuthor = () => {
  const location = useLocation();
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

  // fetching books in table
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [currentActiveLibrary, setCurrentActiveLibrary] = useState('');

  const columns = ["#", "Name", "ISBN", "Publisher", "Library", "Categories", "Status", "Actions"];

  useEffect(() => {
    const savedLibrary = sessionStorage.getItem('currentActiveLibrary') || '';
    setCurrentActiveLibrary(savedLibrary);

    axios.get(`${base_url}/api/authors/books/${authorId}`, {
      params: {
        page: currentPage,
        limit: itemsPerPage,
        search: search,
        library: savedLibrary
      }
    })
      .then(response => {
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setBooks(response.data.data);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('API response is not in the expected format', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, [currentPage, itemsPerPage, search, currentActiveLibrary]);

  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
    }
  }, [location.state]);

  const handleEdit = (id) => {
    navigate(`/books/${id}/edit`);
  };

  const handleDelete = (id) => {
    alertify.confirm(
      'Confirm Delete',
      'Are you sure you want to delete this book?',
      () => {
        axios.post(`${base_url}/api/books/delete/${id}`)
          .then(response => {
            setBooks(books.filter(book => book._id !== id));
            setAlert({
              visible: true,
              type: 'success',
              message: 'Book deleted successfully!'
            });
          })
          .catch(error => {
            console.error('There was an error deleting the book!', error);
            setAlert({
              visible: true,
              type: 'failure',
              message: 'Failed to delete the book. Please try again.'
            });
          });
      },
      () => { }
    );
  };

  const handleChangeStatus = (id) => {
    alertify.confirm(
      'Confirm Status Change',
      'Are you sure you want to change the status of this book?',
      () => {
        axios.post(`${base_url}/api/books/change-status/${id}`)
          .then(response => {
            setBooks(books.map(book =>
              book._id === id ? { ...book, is_active: !book.is_active } : book
            ));
            setAlert({
              visible: true,
              type: 'success',
              message: 'Book status changed successfully!'
            });
          })
          .catch(error => {
            console.error('There was an error changing the book status!', error);
            setAlert({
              visible: true,
              type: 'failure',
              message: 'Failed to change the book status. Please try again.'
            });
          });
      },
      () => {
        alertify.message('Status change cancelled');
      }
    )
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);  // Reset to the first page when a new search is initiated
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const handleActiveLibraryChange = (library) => {
    setCurrentActiveLibrary(library);
  };

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
                          <CRow className='mb-2'>
                            <CCol xs={4}>
                              <CInputGroup>
                                <CInputGroupText>
                                  <CIcon icon={cilSearch} />
                                </CInputGroupText>
                                <CFormInput
                                  type="text"
                                  id="_search"
                                  name="_search"
                                  placeholder="Search here..."
                                  value={search}
                                  onChange={handleSearchChange}
                                />
                              </CInputGroup>
                            </CCol>
                          </CRow>
                          <AuthorFormEditBook
                            columns={columns}
                            data={books}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            handleChangeStatus={handleChangeStatus}
                          />
                          <CPagination className='d-flex justify-content-end mt-2'>
                            <CPaginationItem
                              aria-label="Previous"
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              &laquo;
                            </CPaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                              <CPaginationItem
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                              >
                                {index + 1}
                              </CPaginationItem>
                            ))}
                            <CPaginationItem
                              aria-label="Next"
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              &raquo;
                            </CPaginationItem>
                          </CPagination>
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
