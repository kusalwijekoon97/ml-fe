import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCol, CContainer, CInputGroup, CInputGroupText, CFormInput, CPagination, CPaginationItem, CRow } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cibAddthis, cilSearch } from '@coreui/icons';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import base_url from "../../../utils/api/base_url";
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import BooksTable from '../../../components/table/BooksTable';
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const IndexBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const columns = ["#", "Name", "ISBN", "Author", "Publisher", "Library", "categories", "Status", "Actions"];

  useEffect(() => {
    axios.get(`${base_url}/api/books/all`, {
      params: {
        page: currentPage,
        limit: itemsPerPage,
        search: search,
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
  }, [currentPage, itemsPerPage, search]);

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
                    title="Books"
                    subtitle="List"
                    buttonIcon={<CIcon icon={cibAddthis} />}
                    buttonText="Add Book"
                    linkTo="/books/create"
                  />
                  <CCardBody>
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
                    <BooksTable
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

export default IndexBook;
